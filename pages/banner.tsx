import React from 'react'
import { TextGenerateEffectDemo } from '../components/home/TextGenerateEffectDemo'
import { MovingBorderDemo } from '../components/home/MovingBorderDemo'
import { motion } from 'framer-motion'
import { ConnectKitButton } from 'connectkit'

const Banner = () => {
    return (
        <div className=' flex flex-col items-center justify-center h-screen gap-16 text-center'>
            <TextGenerateEffectDemo />
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 3 }}
            >
                {/* <MovingBorderDemo title='Connect Wallet' /> */}
                <ConnectKitButton />
            </motion.div>
        </div>
    )
}

export default Banner