import React from 'react'
import '../../styles/pages/Offers.css'

import SearchIcon from '@mui/icons-material/Search';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import WalletIcon from '@mui/icons-material/Wallet';
import MovieIcon from '@mui/icons-material/Movie';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import MoneyIcon from '@mui/icons-material/Money';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';


const Offers = () => {
  return (
    <>
        <div className="giftcard-hero">
              <div className="giftcard-search-container">
                <SearchIcon className='giftcard-search-icon' />
                <input 
                type="text" 
                className="giftcard-search-bar" 
                placeholder="Search for Offers by Name or Bank" 
              />
            </div>

            <div className="giftcard-heading">
            <h2>FILTER OFFER BY </h2>
            
              <div className="giftcard-icons">
                      <div className="giftcard-icon-container" id='icnon1'>
                            <div className="giftcard-icon">
                            <CreditCardIcon/>
                            </div> 
                            <p>Credit Card</p>
                      </div>
                      <div className="giftcard-icon-container" id='icnon2'>
                            <div className="giftcard-icon">
                            <AccountBalanceWalletIcon/>
                            </div> 
                            <p>Debit Card</p>
                      </div>
                      <div className="giftcard-icon-container" id='icnon3'>
                          <div className="giftcard-icon">
                          <MovieIcon/>
                          </div> 
                          <p>BookMyShow</p>
                      </div>
                      <div className="giftcard-icon-container" id='icnon4'>
                          <div className="giftcard-icon">
                          <Diversity3Icon/>
                          </div> 
                          <p>Cinema</p>
                      </div>
                      <div className="giftcard-icon-container" id='icnon5'>
                          <div className="giftcard-icon">
                          <WalletIcon/>
                            </div> 
                            <p>Wallet</p>
                      </div>
                      <div className="giftcard-icon-container" id='icnon6'>
                          <div className="giftcard-icon">
                          <WorkspacePremiumIcon/>
                          </div> 
                          <p>Rewards</p>
                      </div>
                      <div className="giftcard-icon-container" id='icnon7'>
                          <div className="giftcard-icon">
                          <MoneyIcon/>
                            </div> 
                            <p>UPI</p>
                      </div>
                      <div className="giftcard-icon-container" id='icnon8'>
                          <div className="giftcard-icon">
                          <MoneyOffIcon/>
                            </div> 
                            <p>Pay Later</p>
                      </div>
                    
              </div>
            </div>
            
        </div>
    </>
  )
}
export default Offers;