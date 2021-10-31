import 'react'

interface PrevChanger<T> {
    (arg0: T): T
}

declare module 'react' {
    export interface StateSetter<T> {
        (arg0: T | PrevChanger): void
    }
}