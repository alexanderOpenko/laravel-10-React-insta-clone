import { usePage } from "@inertiajs/react"

export default function NotificationSound() {
    const { public_url } = usePage().props

    const play = () => {
        const audio = new Audio(public_url + "/" + "multi-pop.mp3")

        const playAudio = () => {
            audio.play()
        }

        audio.addEventListener("canplaythrough", playAudio)

        return () => { audio.removeEventListener("canplaythrough", playAudio) }
    }
    
    return {play: play}
}