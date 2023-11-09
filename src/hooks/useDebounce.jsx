import React, { useEffect, useState } from 'react'

function useDebounce(value, delay = 500) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay)
        return () => {
            clearTimeout(handler);
        }
    }, [value, delay])
}

export default useDebounce