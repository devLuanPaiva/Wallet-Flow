import { AntDesign, Ionicons, MaterialCommunityIcons, Feather, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import React from 'react';

export interface IconProps {
    nameIcon: string;
    lib: string;
    color?: string;
    size?: number;
}

export default function Icon(props: Readonly<IconProps>) {
    const { lib, nameIcon, size, color } = props;

    const renderIcon = () => {
        switch (lib) {
            case 'Ionicons':
                return <Ionicons name={nameIcon as any} size={size} color={color} />;
            case 'MaterialCommunityIcons':
                return <MaterialCommunityIcons name={nameIcon as any} size={size} color={color} />;
            case 'Feather':
                return <Feather name={nameIcon as any} size={size} color={color} />;
            case 'MaterialIcons':
                return <MaterialIcons name={nameIcon as any} size={size} color={color} />;
            case 'AntDesign':
                return <AntDesign name={nameIcon as any} size={size} color={color} />;
            case 'SimpleLineIcons':
                return <SimpleLineIcons name={nameIcon as any} size={size} color={color} />;
            default:
                return <Ionicons name="alert-circle-outline" size={size} color="red" />;
        }
    };

    return (
        <>
            {renderIcon()}
        </>
    );
}
