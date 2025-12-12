# ChatGPT API Automation Example for Next.js
# This script demonstrates how to automate code improvements

import openai
import os
import json
import time
from pathlib import Path

class CodeAutomator:
    def __init__(self, api_key):
        self.client = openai.OpenAI(api_key=api_key)
        self.project_path = Path("./src")
        self.processed_files = set()
        
    def analyze_file(self, file_path):
        """Send file to ChatGPT for analysis"""
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        prompt = f"""
        Analyze this Next.js React component and suggest improvements:
        
        File: {file_path}
        
        ```tsx
        {content}
        ```
        
        Focus on:
        1. Performance optimizations
        2. TypeScript improvements
        3. Accessibility enhancements
        4. Code organization
        
        Return suggestions as JSON:
        {{
            "improvements": [
                {{"type": "performance", "description": "...", "code": "..."}},
                {{"type": "typescript", "description": "...", "code": "..."}}
            ],
            "priority": "high|medium|low"
        }}
        """
        
        try:
            response = self.client.chat.completions.create(
                model="gpt-4",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.1
            )
            
            return json.loads(response.choices[0].message.content)
        except Exception as e:
            print(f"API Error for {file_path}: {e}")
            return None
    
    def apply_improvement(self, file_path, improvement):
        """Apply a single improvement to the file"""
        if improvement.get('code'):
            print(f"✨ Applying {improvement['type']}: {improvement['description']}")
            # In a real script, you'd parse and apply the code changes
            # For demo, just log what would happen
            return True
        return False
    
    def process_component_files(self):
        """Find and process all React components"""
        component_files = list(self.project_path.rglob("*.tsx"))
        
        for file_path in component_files:
            if str(file_path) in self.processed_files:
                continue
                
            print(f"🔍 Analyzing: {file_path}")
            
            suggestions = self.analyze_file(file_path)
            
            if suggestions and suggestions.get('priority') in ['high', 'medium']:
                print(f"📋 Found {len(suggestions['improvements'])} improvements")
                
                for improvement in suggestions['improvements']:
                    success = self.apply_improvement(file_path, improvement)
                    if success:
                        print(f"✅ Applied: {improvement['description']}")
                        time.sleep(1)  # Rate limiting
            
            self.processed_files.add(str(file_path))
            time.sleep(2)  # API rate limiting
    
    def generate_documentation(self):
        """Auto-generate component documentation"""
        for file_path in self.project_path.rglob("*.tsx"):
            if "page.tsx" in str(file_path):  # Focus on page components
                self.generate_page_docs(file_path)
    
    def generate_page_docs(self, file_path):
        """Generate documentation for a page component"""
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()        
        prompt = f"""
        Generate documentation for this Next.js page component:
        
        ```tsx
        {content}
        ```
        
        Return a markdown documentation block:
        """
        
        try:
            response = self.client.chat.completions.create(
                model="gpt-4",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.1
            )
            
            docs = response.choices[0].message.content
            docs_path = file_path.parent / f"{file_path.stem}.md"
            
            with open(docs_path, 'w') as f:
                f.write(docs)
            
            print(f"📝 Generated docs: {docs_path}")
            
        except Exception as e:
            print(f"Doc generation error: {e}")
    
    def run_continuous_improvements(self, hours=2):
        """Run automation for specified hours"""
        start_time = time.time()
        end_time = start_time + (hours * 3600)
        
        print(f"🚀 Starting {hours}-hour automation session...")
        
        while time.time() < end_time:
            print("\n" + "="*50)
            print(f"⏰ Time remaining: {(end_time - time.time())/3600:.1f} hours")
            
            # Phase 1: Component Analysis
            print("🔍 Phase 1: Analyzing components...")
            self.process_component_files()
            
            # Phase 2: Documentation
            print("📚 Phase 2: Generating documentation...")
            self.generate_documentation()
            
            # Phase 3: Wait before next cycle
            print("⏳ Waiting 30 minutes before next cycle...")
            time.sleep(1800)  # 30 minute cycles
        
        print("✅ Automation session complete!")

# Usage Example
if __name__ == "__main__":
    # You'd need to set your OpenAI API key
    API_KEY = "your-openai-api-key-here"
    
    automator = CodeAutomator(API_KEY)
    
    # Run for 2 hours, checking every 30 minutes
    automator.run_continuous_improvements(hours=2)