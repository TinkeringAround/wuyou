import {useContext} from "react";
import {ResponsiveContext} from "grommet";

export function useBreakpoint() {
    const size = useContext(ResponsiveContext);

    const isMobile = size?.includes('small')
    const isMedium = size?.includes('medium')
    const isMiddle = size?.includes('middle')

    return {isMobile, isMedium, isMiddle};
}
