function logMessage(message, type = 'info') {
  const consoleBody = document.getElementById('console-logs');
  if (!consoleBody) return;
  const line = document.createElement('div');
  line.className = `log-line ${type}`;
  line.textContent = message;
  consoleBody.appendChild(line);
}

function connectVercel() {
  logMessage('[i] Initiating Vercel connection...', 'info');
  alert('To connect Vercel:\n1. Run `npx vercel login` in your terminal.\n2. Or connect your repository directly via https://vercel.com/new');
}

function showSupabaseModal() {
  logMessage('[i] Opening Supabase configuration prompt...', 'info');
  const url = prompt('Enter your Supabase URL (e.g. https://xyz.supabase.co):');
  const key = prompt('Enter your Supabase Anon Key:');
  if (url && key) {
    logMessage('[✓] Supabase credentials updated locally.', 'success');
    alert('Supabase keys configured!');
  }
}

console.log('First project dashboard initialized.');
