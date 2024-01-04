import { router } from "@inertiajs/react";

export const handleSuccess = ({id}) => {
    localStorage.setItem('updated', id);
}

export const reloadIfUpdatedTrick = ({id}) => {
 if (localStorage.getItem("updated") && id != localStorage.getItem("updated")) {
    router.reload()
    localStorage.removeItem("updated")
}
}