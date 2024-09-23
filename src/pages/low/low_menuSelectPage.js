import ShoppingBag from "../../components/shoppingBag";
import MenuCategory from "../../components/menu/menuCategory";
import LanguageSelect from "../../components/languageSelect";
import * as main from "../../styles/mainPageStyle";
import * as m from "../../styles/menuPageStyle";
import * as md from "../../styles/modalStyle";
import DetailMenuModal from "../../components/menu/detailMenuModal";
import MenuCheckModal from "../../components/menu/menuCheckModal";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PaymentSelectModal from "../../components/paymentSelectModal";
import CardPaymentModal from "../../components/cardPaymentModal";
import { useDispatch, useSelector } from "react-redux";
import { SetPayListInfo, SetTotalCount, SetTotalMenuModal, SetTotalPrice } from "../../redux/kioskAction";
import ReceiptModal from "../../components/receiptModal";
import ScreenSelect from "../../components/screenSelect";


function LowVersionMenuSelect() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let menuDetailModalState = useSelector( (state)=>{ return state.menuDetailModalState } );
  let checkMenuModalState = useSelector( (state)=>{ return state.checkMenuModalState } );
  let paymentSelectModalState = useSelector( (state)=>{ return state.paymentSelectModalState } );
  let cardPayModalState = useSelector( (state)=>{ return state.cardPayModalState } );
  let receiptModalState = useSelector( (state)=>{ return state.receiptModalState } );
  let totalMenuCount = useSelector((state) => state.totalMenuCount);
  let totalPrice = useSelector((state) => state.totalPrice);
  const shoppingBagList = useSelector((state) => state.shoppingBagList);

  useEffect(() => {
    const updateTotalInfo = () => {
      const totalQuantity = shoppingBagList.reduce((acc, item) => acc + item.quantity, 0);
      const totalPriceValue = shoppingBagList.reduce((acc, item) => acc + item.totalPrice, 0);
      dispatch(SetTotalCount(totalQuantity));
      dispatch(SetTotalPrice(totalPriceValue));
    };
    updateTotalInfo();
  }, [shoppingBagList, dispatch]);

  

  const moveToCheckMenu = () => {
    dispatch(SetTotalMenuModal(true));
  }

  const moveToMain = () => {
    dispatch(SetPayListInfo([]));
    dispatch(SetTotalPrice(0));
    dispatch(SetTotalCount(0));
    navigate('/low');

  }
  

  return (
      <div>
        {
          menuDetailModalState &&
          <md.ModalBackgroundContainer>
            <DetailMenuModal/>
          </md.ModalBackgroundContainer>
        }
        {
          checkMenuModalState &&
          <md.ModalBackgroundContainer>
            <MenuCheckModal/>
          </md.ModalBackgroundContainer>
        }
        {
          paymentSelectModalState && 
            <md.ModalBackgroundContainer>
              <PaymentSelectModal/>
            </md.ModalBackgroundContainer>
        }
        {
          cardPayModalState && 
          <md.ModalTopBackgroundContainer>
            <CardPaymentModal />
          </md.ModalTopBackgroundContainer>
        }
        {
          receiptModalState && 
          <md.ModalTopBackgroundContainer>
            <ReceiptModal />
          </md.ModalTopBackgroundContainer>
        }
        <m.MenuSelectContainer>
          <main.MenuHeader>
            <ScreenSelect/>
            <LanguageSelect/>
          </main.MenuHeader>
          <MenuCategory/>
          <div className="go_to_credit">
              <ShoppingBag/>
              <m.CurrentBagContainer>
              <h3 >선택 메뉴<p className="selected-menu">{totalMenuCount}</p>개</h3>
                <h3 >총 주문 금액 <p>{totalPrice.toLocaleString('ko-KR')}</p>원</h3>
                <button 
                  className="payBtn"
                  onClick={moveToCheckMenu}
                >
                  결제하기
                </button>
                <button 
                  className="backBtn"
                  onClick={moveToMain}
                >
                  처음부터 다시하기
                </button>
              </m.CurrentBagContainer>
          </div>
        </m.MenuSelectContainer>
      </div>
  )
}

export default LowVersionMenuSelect;