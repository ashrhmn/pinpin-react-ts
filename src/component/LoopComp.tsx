import React from 'react'
import { User } from '../types'

const LoopComp = ({user}:{user:User}) => {
    return (
        <div>
            <h1>{user.id}</h1>
            <h1>{user.name}</h1>
        </div>
    )
}

export default LoopComp
