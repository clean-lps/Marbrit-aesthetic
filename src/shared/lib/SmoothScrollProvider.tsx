import { useEffect, createContext, useContext, useCallback, useRef, type ReactNode } from "react"
import { ReactLenis, useLenis } from "lenis/react"
import type { gsap as GSAPType } from "gsap"
import type { ScrollTrigger as STType } from "gsap/ScrollTrigger"

interface SmoothScrollContextValue {
  lenis: ReturnType<typeof useLenis>
  stop: () => void
  start: () => void
}

const SmoothScrollContext = createContext<SmoothScrollContextValue | null>(null)

export function useSmoothScrollControls() {
  const ctx = useContext(SmoothScrollContext)
  if (!ctx) throw new Error("useSmoothScrollControls must be used within SmoothScrollProvider")
  return ctx
}

interface SmoothScrollProviderProps {
  children: ReactNode
  lerp?: number
  duration?: number
}

export function SmoothScrollProvider({ children, lerp = 0.1, duration = 1.2 }: SmoothScrollProviderProps) {
  const lenis = useLenis()
  const gsapRef = useRef<typeof GSAPType | null>(null)
  const stRef = useRef<typeof STType | null>(null)

  const stop = useCallback(() => lenis?.stop(), [lenis])
  const start = useCallback(() => lenis?.start(), [lenis])

  useEffect(() => {
    if (!lenis) return
    const l = lenis
    let mounted = true
    async function init() {
      const [gsapModule, stModule] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ])
      if (!mounted) return
      const gsap = gsapModule.default
      const ScrollTrigger = stModule.ScrollTrigger
      gsap.registerPlugin(ScrollTrigger)
      gsapRef.current = gsap
      stRef.current = ScrollTrigger
      l.on("scroll", ScrollTrigger.update)
      gsap.ticker.add((time) => l.raf(time * 1000))
      gsap.ticker.lagSmoothing(0)
    }
    init()
    return () => {
      mounted = false
      if (stRef.current) {
        l.off("scroll", stRef.current.update)
      }
    }
  }, [lenis])

  return (
    <SmoothScrollContext.Provider value={{ lenis, stop, start }}>
      <ReactLenis root options={{ lerp, duration, smoothWheel: true }}>
        {children}
      </ReactLenis>
    </SmoothScrollContext.Provider>
  )
}
