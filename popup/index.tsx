import { useStorage } from "@plasmohq/storage/hook"
// Ensure this path matches where you put your icon
import iconBase64 from "data-base64:~assets/icon.png"
import "../style.css"

function IndexPopup() {
  const [isProtectionActive, setIsProtectionActive] = useStorage("active", true)
  // This hook stays in sync with the history we save in handler.tsx
  const [history] = useStorage<any[]>("history", [])

  return (
    <div className="w-[320px] bg-slate-950 text-slate-100 p-5 shadow-2xl border border-slate-800">
      {/* Brand Header */}
      <div className="flex items-center gap-3 mb-6">
        <img 
          src={iconBase64} 
          alt="Novus Logo" 
          className="w-10 h-10 rounded-xl shadow-lg shadow-blue-500/10 border border-slate-700" 
        />
        <div>
          <h1 className="text-xl font-bold tracking-tight">Novus</h1>
          <div className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${isProtectionActive ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
              {isProtectionActive ? "System Protected" : "Protection Off"}
            </p>
          </div>
        </div>
      </div>

      {/* Control Card */}
      <div className="bg-slate-900/80 rounded-2xl p-4 border border-slate-800 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-300">Detox Mode</span>
          <button
            onClick={() => setIsProtectionActive(!isProtectionActive)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 focus:outline-none ${
              isProtectionActive ? "bg-blue-600" : "bg-slate-700"
            }`}>
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-all duration-300 ${
                isProtectionActive ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>

      {/* History Log */}
      <div className="space-y-3">
        <div className="flex justify-between items-center px-1">
          <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Recent Activity</h2>
          <span className="text-[9px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full font-mono">
            {history.length}/5
          </span>
        </div>

        <div className="space-y-2">
          {history.length === 0 ? (
            <div className="py-8 text-center border border-dashed border-slate-800 rounded-xl">
              <p className="text-xs text-slate-600 italic">No credentials redacted yet.</p>
            </div>
          ) : (
            history.map((item) => (
              <div 
                key={item.id} 
                className="flex items-center justify-between bg-slate-900/40 p-3 rounded-xl border border-slate-800/50 hover:border-blue-500/30 transition-colors"
              >
                <div>
                  <p className="text-[11px] font-bold text-blue-400">{item.type} Removed</p>
                  <p className="text-[9px] text-slate-500 truncate w-32">{item.site}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-mono block">{item.time}</span>
                  <span className="text-[8px] text-green-500 uppercase font-bold tracking-tighter">Secured</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-900 text-center">
        <p className="text-[9px] text-slate-700 font-medium tracking-wide">NOVUS v1.0 • PRIVACY ENGINE</p>
      </div>
    </div>
  )
}

export default IndexPopup