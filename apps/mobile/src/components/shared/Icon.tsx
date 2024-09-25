import { Ionicons } from '@expo/vector-icons'
import React from 'react'
export interface IconProps {
    nameIcon: React.ComponentProps<typeof Ionicons>["name"]
    color?: string
    size?: number
}
export default function Icon(props: Readonly<IconProps>) {
    return (
        <Ionicons name={props.nameIcon} size={props.size ?? 28} {...props} />
    )
}