import {
  useEffect,
  useState,
} from "react"

export const useGreeting = () => {
  const [greeting, setGreeting] = useState("Good morning")
  useEffect(() => {
    const today = new Date()
    const curHr = today.getHours()
    if (curHr < 12) {
      setGreeting("Good morning")
    } else if (curHr < 18) {
      setGreeting("Good afternoon")
    } else {
      setGreeting("Good evening")
    }
  }, [])

  return {
    greeting,
  }
}
