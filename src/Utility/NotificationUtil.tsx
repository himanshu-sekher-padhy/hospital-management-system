import { notifications } from "@mantine/notifications"
import { IconCheck } from "@tabler/icons-react"

const successNotification = (message: string) => {
    notifications.show({
        title: "Succcess",
        message: message,
        color: 'teal',
        icon: <IconCheck/>,
        withCloseButton: true,
        withBorder:true,
        className:"!border-green-500"
    })
}

const errorNotification = (message: string) => {
    notifications.show({
        title: "Error",
        message: message,
        color: 'red',
        icon: <IconCheck/>,
        withCloseButton: true,
        withBorder:true,
        className:"!border-red-500"
    })
}

export { successNotification, errorNotification }
