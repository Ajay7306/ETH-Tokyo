import Head from 'next/head'
import React, { useContext } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "@rainbow-me/rainbowkit/styles.css";
import {
    ConnectButton,
    getDefaultWallets,
    RainbowKitProvider,
    midnightTheme,
    darkTheme,
    lightTheme
} from "@rainbow-me/rainbowkit";

import {
    WagmiConfig,
    createClient,
    configureChains,
    chain,
    defaultChains,
} from 'wagmi'

import { publicProvider } from 'wagmi/providers/public'


const { chains, provider, webSocketProvider } = configureChains(
    [chain.goerli, chain.polygonMumbai],
    [publicProvider()],
)
const { connectors } = getDefaultWallets({
    appName: "Auto Pay",
    chains
});

const client = createClient({
    autoConnect: true,
    provider,
    webSocketProvider,
    connectors
})

import { AppContext, AppProvider } from "../context/AppContext";
import { SuperFluidProvider } from "../context/SuperFluid";
import ConnectModal from "./ConnectWalletCustom";
import { useRouter } from 'next/router';
import Modal from './Modal';
import Loader from "../components/Loader";
import SideBar from '../components/Sidebar';

const Layout = ({ children }) => {

    const router = useRouter();

    return (

        <WagmiConfig  client={client}>
            <RainbowKitProvider
                showRecentTransactions={true}
                theme={lightTheme({
                    accentColor: '#7F56D9',
                    // accentColorForeground: '#7F56D9',
                    borderRadius: 'medium',
                    // fontStack: 'rounded',
                    //   overlayBlur: 'small',
                })}
                chains={chains}>
                <AppProvider>
                    <SuperFluidProvider>
                        <Head>
                            <title>Autopay - Zap</title>
                            <link rel="icon" href="/favicon.ico"/>
                            <link rel="preconnect" href="https://fonts.googleapis.com" />
                            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap"  rel="stylesheet" />
                        </Head>
                        <div className="flex h-full flex-row  items-start w-full  bg-secondary-white">
                        <SideBar />
                            {children}
                            {/* <ConnectModal /> */}
                            <ToastContainer
                                position="top-right"
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                                theme="dark"
                                className={'z-index-9999'}
                            />

                            <Loader bg={false} message='Loading ...' desc="Please wait Loading !" />
                        </div>
                    </SuperFluidProvider>
                </AppProvider>
            </RainbowKitProvider>
        </WagmiConfig>
    )
}

export default Layout