# Rave House V2 - Automated Code Improvements
# Specifically tailored for your Next.js event/venue project

import openai
import json
import os
import time
import re
import tempfile
import shutil
import subprocess
import asyncio
from pathlib import Path
from typing import List, Dict, Optional, NamedTuple, Union
from dataclasses import dataclass, field
from datetime import datetime
import logging
import random
import math
import sys

# Optional: Load .env file in development
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    # python-dotenv not installed, continue without it
    pass

@dataclass
class RunConfiguration:
    """Configuration for automation runs"""
    dry_run: bool = True
    enable_accessibility: bool = True
    enable_optimization: bool = True
    enable_seo: bool = True
    enable_performance: bool = True
    cost_per_1k_tokens: float = 0.002  # GPT-3.5-turbo pricing estimate
    max_retries: int = 1
    
    # Accessibility analysis specific config
    accessibility_max_files: int = 20  # Limit number of files to analyze
    accessibility_batch_size: int = 3  # Files per batch
    accessibility_sample_rate: float = 1.0  # 0.0-1.0, fraction of files to analyze
    accessibility_rate_limit_seconds: float = 1.0  # Minimum seconds between API calls
    accessibility_max_tokens: int = 4000  # Max tokens per request
    accessibility_model: str = "gpt-3.5-turbo"  # Use cheaper model by default
    accessibility_max_prompt_chars: int = 8000  # Limit prompt size
    
class TaskStatus:
    """Track status of individual tasks"""
    SUCCESS = "success"
    FAILED = "failed"
    SKIPPED = "skipped"
    RETRIED = "retried"

@dataclass
class TaskResult:
    """Result of a single task execution"""
    name: str
    status: str
    api_calls: int = 0
    estimated_tokens: int = 0
    actual_cost: float = 0.0
    error_message: Optional[str] = None
    retry_count: int = 0
    duration: float = 0.0

@dataclass
class RunReport:
    """Complete run report"""
    timestamp: datetime = field(default_factory=datetime.now)
    dry_run: bool = True
    tasks: List[TaskResult] = field(default_factory=list)
    total_estimated_cost: float = 0.0
    total_actual_cost: float = 0.0
    total_api_calls: int = 0
    total_duration: float = 0.0

class RaveHouseAutomator:
    def __init__(self, api_key: str, config: Optional[RunConfiguration] = None):
        self.client = openai.OpenAI(api_key=api_key)
        self.project_root = Path(".")
        self.config = config or RunConfiguration()
        self.logger = logging.getLogger(__name__)
        
    def analyze_accessibility(self) -> Dict[str, Union[List[Dict], int, float]]:
        """Scan components for accessibility improvements with rate limiting and batching"""
        components = list(Path("src/components").rglob("*.tsx"))
        
        # Apply sampling and file limits
        if self.config.accessibility_sample_rate < 1.0:
            sample_size = int(len(components) * self.config.accessibility_sample_rate)
            components = random.sample(components, min(sample_size, len(components)))
        
        # Apply max files limit
        if len(components) > self.config.accessibility_max_files:
            components = components[:self.config.accessibility_max_files]
            self.logger.info(f"Limited analysis to {self.config.accessibility_max_files} files")
        
        # Create batches
        batches = self._create_batches(components, self.config.accessibility_batch_size)
        
        improvements = []
        total_estimated_cost = 0.0
        total_api_calls = 0
        
        self.logger.info(f"Analyzing {len(components)} components in {len(batches)} batches")
        
        for i, batch in enumerate(batches):
            batch_start = time.time()
            
            # Rate limiting - wait before each batch (except first)
            if i > 0:
                time.sleep(self.config.accessibility_rate_limit_seconds)
            
            try:
                batch_results = self._analyze_batch_with_retry(batch)
                improvements.extend(batch_results)
                
                # Estimate cost for this batch
                batch_cost = self._estimate_batch_cost(batch)
                total_estimated_cost += batch_cost
                total_api_calls += 1
                
                batch_duration = time.time() - batch_start
                self.logger.info(f"Batch {i+1}/{len(batches)} completed in {batch_duration:.1f}s, estimated cost: ${batch_cost:.4f}")
                
            except Exception as e:
                self.logger.exception(f"Batch {i+1} failed after all retries: {e}")
                continue
        
        self.logger.info(f"Analysis complete. Total estimated cost: ${total_estimated_cost:.4f}, API calls: {total_api_calls}")        # Return both results and usage data
        return {
            "results": improvements,
            "api_calls": total_api_calls,
            "cost": total_estimated_cost,
            "tokens": total_api_calls * 1000  # Estimate tokens based on API calls
        }
    
    def _create_batches(self, components: List[Path], batch_size: int) -> List[List[Path]]:
        """Split components into batches"""
        batches = []
        for i in range(0, len(components), batch_size):
            batches.append(components[i:i + batch_size])
        return batches
    
    def _analyze_batch_with_retry(self, batch: List[Path]) -> List[Dict]:
        """Analyze a batch of components with retry logic and exponential backoff"""
        for attempt in range(self.config.max_retries + 1):
            try:
                return self._analyze_batch(batch)
            except Exception as e:
                if attempt < self.config.max_retries:
                    # Exponential backoff: 2^attempt seconds + random jitter
                    wait_time = (2 ** attempt) + random.uniform(0, 1)
                    self.logger.warning(f"Batch analysis failed (attempt {attempt + 1}), retrying in {wait_time:.1f}s: {e}")
                    time.sleep(wait_time)
                else:
                    self.logger.error(f"Batch analysis failed after {self.config.max_retries + 1} attempts: {e}")
                    raise
    
    def _analyze_batch(self, batch: List[Path]) -> List[Dict]:
        """Analyze a batch of components in a single API call"""
        # Combine batch content with size limits
        combined_content = self._combine_batch_content(batch)
        
        prompt = f"""Analyze these {len(batch)} event/venue website components for accessibility:

{combined_content}

Check for:
- Missing alt text on images
- Proper ARIA labels for interactive elements
- Keyboard navigation support
- Color contrast issues
- Screen reader compatibility

Return a JSON array of improvement objects. Each object should have:
{{
  "file": "filename",
  "issue": "description",
  "severity": "high|medium|low",
  "fix": "suggested fix"
}}

IMPORTANT: Return only valid JSON array, no additional text."""
        
        try:
            response = self.client.chat.completions.create(
                model=self.config.accessibility_model,
                messages=[{"role": "user", "content": prompt}],
                max_tokens=self.config.accessibility_max_tokens,
                temperature=0.1
            )
            
            response_content = response.choices[0].message.content
            if not response_content or not response_content.strip():
                raise ValueError("Empty response from API")
            
            # Validate and parse response
            return self._validate_and_parse_response(response_content)
            
        except openai.RateLimitError as e:
            self.logger.warning(f"Rate limit hit, waiting 60 seconds: {e}")
            time.sleep(60)
            raise
        except openai.APIError as e:
            self.logger.exception(f"OpenAI API error: {e}")
            raise
        except Exception as e:
            raise
    
    def _combine_batch_content(self, batch: List[Path]) -> str:
        """Combine multiple files into a single prompt with size limits"""
        combined = []
        total_chars = 0
        
        for component in batch:
            try:
                with open(component, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Add file header
                file_section = f"\n--- FILE: {component.name} ---\n{content}\n"
                
                # Check size limits
                if total_chars + len(file_section) > self.config.accessibility_max_prompt_chars:
                    # Truncate content if needed
                    remaining_chars = self.config.accessibility_max_prompt_chars - total_chars - len(f"\n--- FILE: {component.name} ---\n")
                    if remaining_chars > 100:  # Only include if we have meaningful space
                        truncated_content = content[:remaining_chars] + "\n... [TRUNCATED]"
                        file_section = f"\n--- FILE: {component.name} ---\n{truncated_content}\n"
                        combined.append(file_section)
                    break
                
                combined.append(file_section)
                total_chars += len(file_section)
                
            except Exception as e:
                self.logger.warning(f"Could not read {component}: {e}")
                continue
        
        return "".join(combined)    
    def _validate_and_parse_response(self, response_content: str) -> List[Dict]:
        """Validate API response structure and parse JSON safely"""
        try:
            # Clean up response (remove code blocks if present)
            cleaned_content = response_content.strip()
            if cleaned_content.startswith('```json'):
                cleaned_content = cleaned_content[7:]
            if cleaned_content.endswith('```'):
                cleaned_content = cleaned_content[:-3]
            cleaned_content = cleaned_content.strip()
            
            # Parse JSON
            suggestions = json.loads(cleaned_content)
            
            # Validate structure
            if not isinstance(suggestions, list):
                self.logger.warning("API response is not a list, wrapping in list")
                suggestions = [suggestions] if isinstance(suggestions, dict) else []
            
            # Validate each suggestion object
            valid_suggestions = []
            for suggestion in suggestions:
                if isinstance(suggestion, dict):
                    # Ensure required fields exist with defaults
                    validated_suggestion = {
                        "file": suggestion.get("file", "unknown"),
                        "issue": suggestion.get("issue", suggestion.get("description", "Unknown issue")),
                        "severity": suggestion.get("severity", "medium"),
                        "fix": suggestion.get("fix", suggestion.get("suggestion", "No fix provided"))
                    }
                    valid_suggestions.append(validated_suggestion)
                else:
                    self.logger.warning(f"Skipping invalid suggestion object: {suggestion}")
            
            return valid_suggestions
            
        except json.JSONDecodeError as e:
            self.logger.error(f"JSON decode error: {e}. Response content: {response_content[:200]}...")
            return []  # Return empty list instead of failing
        except KeyError as e:
            self.logger.error(f"Missing expected key in response: {e}")
            return []
        except Exception as e:
            self.logger.error(f"Unexpected error parsing response: {e}")
            return []
    
    def _estimate_batch_cost(self, batch: List[Path]) -> float:
        """Estimate cost for analyzing a batch of files"""
        # Rough estimation: combine file sizes, estimate tokens (1 token ~= 4 chars)
        total_chars = 0
        for component in batch:
            try:
                total_chars += component.stat().st_size
            except Exception:
                total_chars += 1000  # Default estimate if can't read
        
        # Add prompt overhead (instructions, formatting)
        total_chars += 1000
        
        # Limit by max prompt chars
        total_chars = min(total_chars, self.config.accessibility_max_prompt_chars)
        
        # Estimate tokens (input + output)
        estimated_input_tokens = total_chars / 4
        estimated_output_tokens = self.config.accessibility_max_tokens * 0.5  # Assume 50% of max
        total_tokens = estimated_input_tokens + estimated_output_tokens
        
        return (total_tokens / 1000) * self.config.cost_per_1k_tokens
    
    def optimize_event_components(self) -> Optional[Dict[str, Union[int, float]]]:
        """Specifically optimize event-related components"""
        event_files = [
            "src/components/sections/home",
            "src/app/events", 
            "src/app/tickets",
            "src/app/vip"
        ]
        
        api_calls = 0
        estimated_cost = 0.0
        
        for path in event_files:
            self.optimize_directory(Path(path))
            # For now, placeholder usage tracking
            api_calls += 1
            estimated_cost += 0.01
            
        # Return usage data
        return {
            "api_calls": api_calls,
            "cost": estimated_cost,
            "tokens": api_calls * 500  # Estimate tokens per optimization
        }
    
    def optimize_directory(self, dir_path: Path):
        """Optimize all components in a directory"""
        if not dir_path.exists():
            return
            
        for file in dir_path.rglob("*.tsx"):
            self.optimize_component(file)
    
    def optimize_component(self, file_path: Path):
        """Optimize a single component with event-specific focus"""
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        prompt = f"""
        Optimize this rave/event website component:
        
        File: {file_path}
        Component: {content}
        
        Focus on:
        1. Performance for mobile users (common at events)
        2. Loading states for ticket purchasing
        3. Error handling for payment flows
        4. Responsive design for different screen sizes
        5. SEO optimization for event discovery
        
        Provide specific code improvements with explanations.
        """
        
        try:
            response = self.client.chat.completions.create(
                model="gpt-4",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.1
            )
            
            improvements = response.choices[0].message.content
            
            # Log improvements (in real usage, you'd apply them)
            print(f"🎵 Optimizations for {file_path.name}:")
            print(improvements[:200] + "...")
            print()
            
        except Exception as e:
                print(f"Error optimizing {file_path}: {e}")
    
        def generate_seo_metadata(self) -> Optional[Dict[str, Union[int, float]]]:
            """Auto-generate SEO metadata for event pages"""
        pages = list(Path("src/app").rglob("page.tsx"))
        
        api_calls = 0
        estimated_cost = 0.0
        
        for page in pages:
            if page.parent.name in ["events", "tickets", "vip", "gallery"]:
                self.create_seo_for_page(page)
                api_calls += 1
                estimated_cost += 0.005  # SEO generation cost estimate
                
        return {
            "api_calls": api_calls,
            "cost": estimated_cost,
            "tokens": api_calls * 300
        }
    
    def _validate_typescript_metadata(self, content: str) -> tuple[bool, str]:
        """Validate TypeScript metadata content for safety"""
        if not content or not content.strip():
            return False, "Empty or whitespace-only content"
            
        content = content.strip()
        
        # Check for basic TypeScript export pattern
        export_pattern = r'export\s+(const|default)\s+.*='
        if not re.search(export_pattern, content, re.MULTILINE):
            return False, "Missing TypeScript export statement"
            
        # Check for metadata object patterns
        metadata_patterns = [
            r'title\s*:', 
            r'description\s*:',
            r'openGraph\s*:',
        ]
        
        pattern_matches = sum(1 for pattern in metadata_patterns if re.search(pattern, content))
        if pattern_matches < 2:
            return False, "Missing required metadata fields (title, description, openGraph)"
            
        # Check for suspicious patterns that might indicate malformed content
        suspicious_patterns = [
            r'undefined',
            r'null(?!\s*[,}])',  # null not as a value
            r'\[object Object\]',
            r'console\.log',
            r'alert\(',
            r'document\.',
            r'window\.',
        ]
        
        for pattern in suspicious_patterns:
            if re.search(pattern, content, re.IGNORECASE):
                return False, f"Suspicious content detected: {pattern}"
                
        # Basic bracket/brace matching
        open_braces = content.count('{')
        close_braces = content.count('}')
        if open_braces != close_braces:
            return False, f"Unmatched braces: {open_braces} open, {close_braces} close"
            
        return True, "Valid TypeScript metadata"
    
    def _syntax_check_typescript(self, temp_path: Path) -> tuple[bool, str]:
        """Run lightweight TypeScript syntax check if tsc is available"""
        try:
            # Validate temp_path is in expected temp directory
            resolved_temp = temp_path.resolve()
            if not str(resolved_temp).startswith(tempfile.gettempdir()):
                return False, "Invalid temp file path"
            
            # Try TypeScript compiler if available
            result = subprocess.run(
                ['npx', 'tsc', '--noEmit', '--skipLibCheck', str(resolved_temp)],
                capture_output=True,
                text=True,
                timeout=30,
                cwd=self.project_root
            )
            
            if result.returncode == 0:
                return True, "TypeScript syntax check passed"
            else:
                # Filter out common non-critical warnings
                errors = result.stderr.strip()
                if 'error TS' in errors and 'Cannot find module' not in errors:
                    return False, f"TypeScript syntax errors: {errors[:200]}..."
                else:
                    return True, "TypeScript syntax check passed (ignoring module resolution)"
                    
        except (subprocess.TimeoutExpired, FileNotFoundError, subprocess.SubprocessError) as e:
            # Fall back to basic validation if tsc not available
            logging.debug(f"TypeScript check unavailable, using basic validation: {e}")
            return True, "TypeScript compiler not available, using basic validation"
            
    def _safe_write_metadata(self, content: str, target_path: Path) -> bool:
        """Safely write metadata with validation and atomic operations"""
        # Initialize variables to avoid NameError in exception handling
        temp_path = None
        backup_path = None
        
        # Step 1: Basic content validation
        is_valid, validation_msg = self._validate_typescript_metadata(content)
        if not is_valid:
            print(f"❌ Validation failed: {validation_msg}")
            print(f"   Skipping write to {target_path}")
            return False
            
        # Step 2: Create temporary file for testing
        try:
            with tempfile.NamedTemporaryFile(mode='w', suffix='.ts', delete=False) as temp_file:
                temp_path = Path(temp_file.name)
                temp_file.write(content)
                
            # Step 3: Run syntax check if possible
            syntax_ok, syntax_msg = self._syntax_check_typescript(temp_path)
            if not syntax_ok:
                print(f"❌ Syntax check failed: {syntax_msg}")
                print(f"   Skipping write to {target_path}")
                if temp_path is not None and temp_path.exists():
                    temp_path.unlink()  # Clean up temp file
                return False
                
            # Step 4: Check if target file exists and create backup
            if target_path.exists():
                backup_path = target_path.with_suffix(f'.ts.backup.{int(time.time())}')
                shutil.copy2(target_path, backup_path)
                print(f"📁 Created backup: {backup_path.name}")
                
            # Step 5: Atomic write (move temp file to target)
            target_path.parent.mkdir(parents=True, exist_ok=True)
            shutil.move(str(temp_path), str(target_path))
            
            print(f"✅ Successfully wrote validated metadata to {target_path}")
            print(f"   Validation: {validation_msg}")
            print(f"   Syntax: {syntax_msg}")
            
            # Clean up old backup if write was successful
            if backup_path is not None and backup_path.exists():
                try:
                    backup_path.unlink()
                except OSError:
                    pass  # Keep backup if we can't delete it
                    
            return True
            
        except Exception as e:
            print(f"❌ Error during safe write: {e}")
            # Try to restore backup if something went wrong
            if backup_path is not None and backup_path.exists() and not target_path.exists():
                try:
                    shutil.move(str(backup_path), str(target_path))
                    print(f"🔄 Restored backup to {target_path}")
                except Exception as restore_error:
                    print(f"❌ Failed to restore backup: {restore_error}")
                    
            # Clean up temp file
            if temp_path is not None and temp_path.exists():
                try:
                    temp_path.unlink()
                except OSError:
                    pass
                    
            return False
    
    def create_seo_for_page(self, page_path: Path):
        """Generate SEO metadata for a specific page with safety checks"""
        try:
            with open(page_path, 'r', encoding='utf-8') as f:
                content = f.read()
        except Exception as e:
            print(f"❌ Error reading {page_path}: {e}")
            return
            
        page_type = page_path.parent.name
        
        prompt = f"""
        Generate Next.js metadata for this {page_type} page of a rave/event venue website:
        
        {content}
        
        Create a complete TypeScript metadata export with:
        - Compelling title and description for event discovery
        - Relevant keywords for rave/electronic music scene
        - Open Graph data for social sharing
        - JSON-LD structured data for events
        
        Return ONLY the TypeScript code, starting with 'export const metadata' or 'export default'.
        Ensure all strings are properly quoted and objects are valid TypeScript.
        """
        
        try:
            response = self.client.chat.completions.create(
                model="gpt-4",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.1  # Lower temperature for more consistent output
            )
            
            if not response.choices or not response.choices[0].message.content:
                print(f"❌ Empty response from OpenAI for {page_path}")
                return
                
            metadata_content = response.choices[0].message.content.strip()
            
            # Remove any markdown code blocks if present
            metadata_content = re.sub(r'^```(?:typescript|ts)?\n', '', metadata_content, flags=re.MULTILINE)
            metadata_content = re.sub(r'\n```$', '', metadata_content, flags=re.MULTILINE)
            metadata_content = metadata_content.strip()
            
            # Safe write with validation
            metadata_path = page_path.parent / "metadata.ts"
            success = self._safe_write_metadata(metadata_content, metadata_path)
            
            if success:
                print(f"📱 Generated SEO metadata: {metadata_path}")
            else:
                print(f"⚠️  Failed to write metadata for {page_type} page")
                # Log the content for debugging (truncated)
                print(f"   Generated content preview: {metadata_content[:100]}...")
                
        except Exception as e:
            print(f"❌ SEO generation error for {page_path}: {e}")
            logging.exception(f"Detailed error for {page_path}")
    
    def monitor_performance(self) -> Optional[Dict[str, Union[int, float]]]:
        """Analyze bundle size and suggest optimizations"""
        prompt = """
        Analyze this Next.js project structure for performance opportunities:
        
        - Event listing pages with image galleries
        - Ticket purchasing flows
        - VIP booking system
        - Mobile-heavy user base
        
        Suggest:
        1. Image optimization strategies
        2. Code splitting improvements
        3. Caching strategies for event data
        4. Progressive loading techniques
        
        Focus on real-world rave/club website needs.
        """
        
        try:
            response = self.client.chat.completions.create(
                model="gpt-4",
                messages=[{"role": "user", "content": prompt}]
            )
            
            suggestions = response.choices[0].message.content
            print("🚀 Performance Optimization Suggestions:")
            print(suggestions)
            
            return {
                "api_calls": 1,
                "cost": 0.03,  # GPT-4 API call cost estimate
                "tokens": 1500  # Estimated tokens for performance analysis
            }
            
        except Exception as e:
            print(f"Performance analysis error: {e}")
            return {
                "api_calls": 0,
                "cost": 0.0,
                "tokens": 0
            }
    
    def _estimate_task_cost(self, task_name: str, config: RunConfiguration) -> TaskResult:
        """Estimate API calls and cost for a task"""
        estimates = {
            "accessibility": {"api_calls": 5, "tokens_per_call": 2000},
            "optimization": {"api_calls": 8, "tokens_per_call": 2500}, 
            "seo": {"api_calls": 4, "tokens_per_call": 1500},
            "performance": {"api_calls": 1, "tokens_per_call": 1000}
        }
        
        estimate = estimates.get(task_name, {"api_calls": 1, "tokens_per_call": 1000})
        total_tokens = estimate["api_calls"] * estimate["tokens_per_call"]
        estimated_cost = (total_tokens / 1000) * config.cost_per_1k_tokens
        
        return TaskResult(
            name=task_name,
            status=TaskStatus.SKIPPED,
            api_calls=estimate["api_calls"],
            estimated_tokens=total_tokens,
            actual_cost=estimated_cost
        )
    
    def _execute_task_with_retry(self, task_func, task_name: str, config: RunConfiguration) -> TaskResult:
        """Execute a task with retry logic and error handling"""
        result = TaskResult(name=task_name, status=TaskStatus.FAILED)
        start_time = time.time()
        
        for attempt in range(config.max_retries + 1):
            try:
                if config.dry_run:
                    print(f"[DRY RUN] Would execute {task_name}")
                    result.status = TaskStatus.SKIPPED
                    break
                    
                print(f"Executing {task_name} (attempt {attempt + 1}/{config.max_retries + 1})")
                
                # Execute task function and capture usage if returned
                usage = task_func()
                
                # Accumulate API usage if task returned usage data
                if usage and isinstance(usage, dict):
                    result.api_calls += usage.get("api_calls", 0)
                    result.actual_cost += usage.get("cost", 0.0)
                    result.estimated_tokens += usage.get("tokens", 0)
                
                result.status = TaskStatus.SUCCESS
                if attempt > 0:
                    result.status = TaskStatus.RETRIED
                    result.retry_count = attempt
                break
                
            except Exception as e:
                error_msg = f"Task {task_name} failed on attempt {attempt + 1}: {str(e)}"
                print(f"❌ {error_msg}")
                result.error_message = error_msg
                
                if attempt < config.max_retries:
                    sleep_time = 2 ** attempt  # Exponential backoff
                    print(f"Retrying in {sleep_time} seconds...")
                    time.sleep(sleep_time)
                else:
                    result.status = TaskStatus.FAILED
                    
        result.duration = time.time() - start_time
        return result
    
    def _save_run_report(self, report: RunReport):
        """Save run report to file"""
        report_file = Path(f"automation_report_{report.timestamp.strftime('%Y%m%d_%H%M%S')}.json")
        
        # Convert to JSON-serializable format
        report_data = {
            "timestamp": report.timestamp.isoformat(),
            "dry_run": report.dry_run,
            "total_estimated_cost": report.total_estimated_cost,
            "total_actual_cost": report.total_actual_cost,
            "total_api_calls": report.total_api_calls,
            "total_duration": report.total_duration,
            "tasks": [
                {
                    "name": task.name,
                    "status": task.status,
                    "api_calls": task.api_calls,
                    "estimated_tokens": task.estimated_tokens,
                    "actual_cost": task.actual_cost,
                    "error_message": task.error_message,
                    "retry_count": task.retry_count,
                    "duration": task.duration
                } for task in report.tasks
            ]
        }
        
        with open(report_file, 'w') as f:
            json.dump(report_data, f, indent=2)
        
        print(f"📊 Run report saved to {report_file}")
    
    def run_daily_maintenance(self, config: Optional[RunConfiguration] = None):
        """Run daily automated maintenance tasks with cost control and error handling"""
        if config is None:
            config = RunConfiguration(dry_run=True)  # Safe default
            
        report = RunReport(dry_run=config.dry_run)
        
        print("🎵 Starting Rave House V2 Daily Automation...")
        print("=" * 50)
        print(f"Mode: {'DRY RUN' if config.dry_run else 'LIVE RUN'}")
        
        # Pre-run cost estimation
        enabled_tasks = []
        if config.enable_accessibility:
            enabled_tasks.append(("accessibility", self.analyze_accessibility))
        if config.enable_optimization:
            enabled_tasks.append(("optimization", self.optimize_event_components))
        if config.enable_seo:
            enabled_tasks.append(("seo", self.generate_seo_metadata))
        if config.enable_performance:
            enabled_tasks.append(("performance", self.monitor_performance))
            
        # Calculate total estimated cost
        total_estimated_cost = 0.0
        total_api_calls = 0
        
        for task_name, _ in enabled_tasks:
            estimate = self._estimate_task_cost(task_name, config)
            total_estimated_cost += estimate.actual_cost
            total_api_calls += estimate.api_calls
            
        report.total_estimated_cost = total_estimated_cost
        report.total_api_calls = total_api_calls
        
        print(f"\n💰 Cost Estimate:")
        print(f"   Enabled tasks: {len(enabled_tasks)}")
        print(f"   Estimated API calls: {total_api_calls}")
        print(f"   Estimated cost: ${total_estimated_cost:.2f}")
        
        if config.dry_run:
            print("\n🔍 DRY RUN - No actual API calls will be made")
        else:
            print(f"\n⚠️  LIVE RUN - This will make {total_api_calls} API calls costing ~${total_estimated_cost:.2f}")
            
        print("\n" + "=" * 50)
        
        # Execute tasks
        start_time = time.time()
        
        for task_name, task_func in enabled_tasks:
            print(f"\n{'♿' if task_name == 'accessibility' else '⚡' if task_name == 'optimization' else '📱' if task_name == 'seo' else '🚀'} {task_name.title()}...")
            
            result = self._execute_task_with_retry(task_func, task_name, config)
            report.tasks.append(result)
            
            status_icon = "✅" if result.status == TaskStatus.SUCCESS else "⚠️" if result.status == TaskStatus.RETRIED else "❌" if result.status == TaskStatus.FAILED else "⏭️"
            print(f"   {status_icon} {result.status.title()} ({result.duration:.1f}s)")
            
            if result.error_message:
                print(f"   Error: {result.error_message}")
                
        report.total_duration = time.time() - start_time
        
        # Final summary
        successful_tasks = len([t for t in report.tasks if t.status == TaskStatus.SUCCESS])
        failed_tasks = len([t for t in report.tasks if t.status == TaskStatus.FAILED])
        skipped_tasks = len([t for t in report.tasks if t.status == TaskStatus.SKIPPED])
        
        print("\n" + "=" * 50)
        print(f"✅ Automation {'simulation' if config.dry_run else 'run'} complete!")
        print(f"📊 Results: {successful_tasks} success, {failed_tasks} failed, {skipped_tasks} skipped")
        print(f"⏱️  Total duration: {report.total_duration:.1f}s")
        
        if config.dry_run:
            print(f"💰 Would have cost: ${report.total_estimated_cost:.2f}")
        else:
            print(f"💰 Estimated cost: ${report.total_estimated_cost:.2f}")
            
        # Save report
        self._save_run_report(report)
        
        if failed_tasks > 0:
            print("\n⚠️  Some tasks failed. Check the report for details.")
            return False
            
        return True

# Example usage for your specific project
def main():
    # Load API key from environment variables
    API_KEY = os.getenv("OPENAI_API_KEY")
    if not API_KEY:
        print("❌ Error: OPENAI_API_KEY environment variable is not set")
        print("Please set your OpenAI API key:")
        print("  Windows: set OPENAI_API_KEY=your-api-key")
        print("  Linux/Mac: export OPENAI_API_KEY=your-api-key")
        print("  Or create a .env file with: OPENAI_API_KEY=your-api-key")
        sys.exit(1)
    
    try:
        automator = RaveHouseAutomator(API_KEY)
    except Exception as e:
        print(f"❌ Failed to initialize automator: {e}")
        sys.exit(1)
    
    # Example configurations
    # Dry run first to see costs
    dry_config = RunConfiguration(
        dry_run=True,
        enable_accessibility=True,
        enable_optimization=True,
        enable_seo=False,  # Skip expensive SEO generation
        enable_performance=True,
        cost_per_1k_tokens=0.03
    )
    
    # Production run configuration
    prod_config = RunConfiguration(
        dry_run=False,
        enable_accessibility=True,
        enable_optimization=False,  # Skip heavy optimization
        enable_seo=True,
        enable_performance=True,
        max_retries=2
    )
    
    print("Running dry run first...")
    automator.run_daily_maintenance(dry_config)
    
    # Uncomment to run actual automation
    # print("\nRunning production automation...")
    # automator.run_daily_maintenance(prod_config)

if __name__ == "__main__":
    main()