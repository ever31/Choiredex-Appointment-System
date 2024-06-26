import React, { useRef, useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  faHome,
  faFileSignature,
  faCamera,
  faQuestion,
  faPencilAlt,
  faSpa,
  faSignOutAlt,
  faUserCircle,
  faCalendarAlt,
  faHistory,
  faCommentDots,
  faFileDownload,
  faFilePdf,
  faUsers,
  faBriefcase,
  faCalendarWeek,
  faBell,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CanvasDraw from "react-canvas-draw";
import LZString from "lz-string";
import moment from "moment";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ConsentFormPDF from "../clientprofile/ConsentForm/ConsentFormPDF";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/css";
import ACTION_LOG_OUT_CLICKED from "../../../actions/LogOut/ACTION_LOG_OUT_CLICKED";
import ACTION_CART_IS_NOT_ACTIVE from "../../../actions/CartIsActive/ACTION_CART_IS_NOT_ACTIVE";
import ACTION_PDF_LOADING_RESET from "../../../actions/PDFLoading/ACTION_PDF_LOADING_RESET";
import ACTION_PDF_LOADING from "../../../actions/PDFLoading/ACTION_PDF_LOADING";
import ACTION_NAVBAR_TOGGLE_RESET from "../../../actions/Nav/ACTION_NAVBAR_TOGGLE_RESET";
import ACTION_BODY_SCROLL_ALLOW from "../../../actions/Body_Scroll/ACTION_BODY_SCROLL_ALLOW";
import "./LargeScreenSideMenu.css";
import "../../../components/treatments/card_styling.css";

const override = css`
  display: block;
  position: absolute;
  left: 25%;
  right: 25%;
`;

const LargeScreenSideMenu = React.forwardRef((props, ref) => {
  const { LandingPageRef } = ref;

  const {
    getClientData,
    getEmployeeData,
    handleClickToScrollToHome,
    initialScreenSize,
    currentScreenSize,
    resetNotifications,
  } = props;

  const dispatch = useDispatch();
  const location = useLocation();
  const signature = useRef(null);
  const pdfDownloadRef = useRef(null);

  const cartIsActive = useSelector((state) => state.cartIsActive.cartIsActive);
  const logoutClicked = useSelector(
    (state) => state.logoutClicked.log_out_clicked
  );
  const consentFormLastPageOpened = useSelector(
    (state) => state.consentFormLastPageOpened.consent_form_active_page
  );
  const userAuthenticated = useSelector(
    (state) => state.userAuthenticated.user_authenticated
  );
  const finalBookButtonActive = useSelector(
    (state) => state.finalBookButton.final_book_button_active
  );
  const adminAuthenticated = useSelector(
    (state) => state.adminAuthenticated.admin_authenticated
  );
  const guestConsentFormAccessToken = useSelector(
    (state) => state.guestConsentFormAccessToken.access_token
  );
  const cancelAppointmentClicked = useSelector(
    (state) => state.cancelAppointmentClicked.cancelAppointmentClicked
  );
  const pdfLoading = useSelector((state) => state.pdfLoading.pdf_loading);
  const addProfilePhotoClicked = useSelector(
    (state) => state.addProfilePhotoClicked.add_profile_photo_clicked
  );
  const imageLoading = useSelector((state) => state.imageLoading.image_loading);

  const [pdfSpinnerActive, changePDFSpinnerActive] = useState(false);

  const adminNotifications = useSelector(
    (state) => state.adminNotifications.notifications
  );

  useEffect(() => {
    return () => {
      if (pdfLoading) {
        dispatch(ACTION_PDF_LOADING_RESET());
      }
    };
  }, [pdfLoading, dispatch]);

  const loadingCompleted = useCallback(() => {
    changePDFSpinnerActive(true);
    if (!pdfLoading) {
      dispatch(ACTION_PDF_LOADING());
    } else {
      return null;
    }
  }, [pdfLoading, dispatch]);

  const handlePDFDownloadClick = useEffect(() => {
    if (pdfSpinnerActive) {
      const loadingSpinnerDuration = setTimeout(() => {
        changePDFSpinnerActive(false);
        if (pdfDownloadRef) {
          if (pdfDownloadRef.current) {
            pdfDownloadRef.current.click();
          }
        }
        dispatch(ACTION_PDF_LOADING_RESET());
      }, 3000);
      return () => {
        clearTimeout(loadingSpinnerDuration);
      };
    }
  }, [pdfSpinnerActive, dispatch]);

  const handleAdminResetNotifications = () => {
    if (adminNotifications) {
      if (adminNotifications.length > 0) {
        if (
          adminNotifications.filter((notification) => notification.new === true)
            .length > 0
        ) {
          resetNotifications();
        }
      }
    }
  };

  const consentFormOnFile = (item) => {
    return (
      <div
        className="large_screen_side_menu_item_container"
        onClick={() => loadingCompleted()}
      >
        <div className="large_screen_side_menu_item">
          <FontAwesomeIcon
            className="large_screen_side_menu_item_icon"
            icon={faFileDownload}
            style={{
              color: "rgba(0, 129, 177, 0.9)",
            }}
          />
          <h2
            style={{
              color: "rgba(0, 129, 177, 0.9)",
            }}
          >
            Download Latest Consent Form
          </h2>
          <p style={{ display: pdfLoading ? "none" : "block" }}>
            {"(" +
              moment.unix(item.consentForm.createdAt / 1000).format("l") +
              ")"}
          </p>
        </div>
      </div>
    );
  };

  const noConsentFormOnFile = () => {
    return (
      <div className="large_screen_side_menu_item_container">
        <FontAwesomeIcon
          className="large_screen_side_menu_item_icon"
          icon={faFilePdf}
          style={{
            color: "rgba(177, 48, 0, 0.9)",
          }}
        />
        <h2
          style={{
            color: "rgba(177, 48, 0, 0.9)",
          }}
        >
          No Consent Form on File
        </h2>
      </div>
    );
  };

  const renderDownloadConsentFormButton = () => {
    if (getClientData) {
      if (getClientData.client) {
        if (getClientData.client.consentForm) {
          if (getClientData.client.consentForm.date) {
            return (
              <>
                {pdfLoading ? (
                  <PDFDownloadLink
                    document={
                      getClientData ? (
                        <ConsentFormPDF
                          getClientData={{
                            client: getClientData.client,
                          }}
                          signature={
                            signature
                              ? signature.current
                                ? signature.current.canvasContainer.children[1].toDataURL()
                                : null
                              : null
                          }
                          consentFormLastUpdated={moment
                            .unix(
                              getClientData.client.consentForm.createdAt / 1000
                            )
                            .format("l")}
                          onClick={handlePDFDownloadClick}
                        />
                      ) : null
                    }
                    fileName={
                      getClientData.client.firstName[0].toUpperCase() +
                      getClientData.client.firstName.slice(1).toLowerCase() +
                      "_" +
                      getClientData.client.lastName[0].toUpperCase() +
                      getClientData.client.lastName.slice(1).toLowerCase() +
                      "_" +
                      "Glow_Labs_Consent_Form.pdf"
                    }
                    className="large_screen_side_menu_pdf_container"
                  >
                    <div
                      className="large_screen_side_menu_item_container"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "1rem",
                      }}
                      ref={pdfDownloadRef}
                    >
                      <ClipLoader
                        size={32}
                        css={override}
                        color={"rgb(44, 44, 52)"}
                        loading={pdfLoading}
                      />
                    </div>
                  </PDFDownloadLink>
                ) : (
                  consentFormOnFile(getClientData.client)
                )}
              </>
            );
          } else {
            if (!adminAuthenticated) {
              return noConsentFormOnFile();
            }
          }
        } else {
          if (!adminAuthenticated) {
            return noConsentFormOnFile();
          }
        }
      } else {
        if (!adminAuthenticated) {
          return noConsentFormOnFile();
        }
      }
    } else {
      if (!adminAuthenticated) {
        return noConsentFormOnFile();
      }
    }
  };

  const navMenuScrollToHome = () => {
    dispatch(ACTION_NAVBAR_TOGGLE_RESET());
    dispatch(ACTION_BODY_SCROLL_ALLOW());
    dispatch(ACTION_CART_IS_NOT_ACTIVE());

    setTimeout(() => {
      handleClickToScrollToHome(LandingPageRef);
    }, 300);

    document.body.classList.remove("no_scroll");
    document.body.style.setProperty("overflow", "scroll");
  };

  return (
    <div
      className="large_sceen_logged_in_side_menu"
      style={{
        filter: cartIsActive
          ? "blur(8px) brightness(70%)"
          : logoutClicked ||
            finalBookButtonActive ||
            cancelAppointmentClicked ||
            addProfilePhotoClicked ||
            imageLoading
          ? "blur(5px) brightness(50%)"
          : "none",
        pointerEvents:
          cartIsActive ||
          logoutClicked ||
          finalBookButtonActive ||
          cancelAppointmentClicked ||
          addProfilePhotoClicked ||
          imageLoading
            ? "none"
            : "auto",
        display:
          (userAuthenticated && location.pathname.includes("account")) ||
          (adminAuthenticated && location.pathname.includes("admin")) ||
          (guestConsentFormAccessToken &&
            location.pathname.includes("consentform"))
            ? !currentScreenSize
              ? initialScreenSize >= 1200
                ? "flex"
                : "none"
              : currentScreenSize >= 1200
              ? "flex"
              : "none"
            : "none",
      }}
    >
      <CanvasDraw
        className="consent_form_signature"
        saveData={
          getClientData
            ? getClientData.client
              ? getClientData.client.consentForm.consentFormSignature
                ? LZString.decompressFromEncodedURIComponent(
                    getClientData.client.consentForm.consentFormSignature
                  )
                  ? LZString.decompressFromEncodedURIComponent(
                      getClientData.client.consentForm.consentFormSignature
                    ).toString()
                  : ""
                : ""
              : ""
            : ""
        }
        hideGrid={true}
        hideInterface={true}
        disabled
        canvasHeight="100%"
        canvasWidth="100%"
        immediateLoading={true}
        ref={signature ? signature : null}
        style={{ display: "none" }}
      />
      <div className="large_screen_side_menu_item_container">
        <div className="large_screen_account_nav_logo_container">
          <a className="large_screen_account_nav_logo" href="/">
            <svg
              className="large_screen_account_nav_logo_svg"
              width="50%"
              viewBox="0 0 6000 4000"
              fill="rgb(44, 44, 52)"
              shapeRendering="geometricPrecision"
            >
              <g xmlns="http://www.w3.org/2000/svg" transform="translate(0.000000,1377.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                <path d="M3423 13756 c-353 -68 -638 -297 -767 -618 -149 -369 -62 -800 219 -1081 294 -295 729 -377 1116 -212 271 116 474 350 565 650 25 83 28 104 28 265 1 154 -2 185 -22 254 -86 296 -264 514 -527 646 -134 68 -264 100 -420 106 -77 2 -146 -1 -192 -10z"/>
                <path d="M6136 13754 c-331 -60 -598 -264 -740 -565 -73 -154 -90 -236 -90 -424 0 -135 3 -173 22 -243 119 -440 485 -739 929 -760 676 -31 1186 596 1019 1252 -48 185 -140 341 -284 477 -106 100 -214 167 -346 214 -175 63 -343 79 -510 49z"/>
                <path d="M8712 13754 c-326 -59 -594 -262 -737 -558 -79 -163 -108 -328 -93 -526 10 -124 38 -223 97 -345 131 -269 366 -460 659 -536 101 -27 287 -36 389 -19 218 34 390 120 549 273 352 337 409 873 135 1287 -208 314 -627 492 -999 424z"/>
                <path d="M11276 13755 c-400 -76 -710 -364 -808 -751 -32 -128 -32 -362 0 -482 61 -227 188 -420 362 -551 178 -134 353 -198 570 -208 675 -31 1183 596 1016 1252 -92 360 -382 640 -756 730 -95 23 -288 28 -384 10z"/>
                <path d="M20335 12664 c-110 -12 -283 -50 -390 -86 -462 -153 -751 -501 -846 -1018 -12 -62 -14 -398 -14 -1925 l0 -1850 23 -105 c96 -437 321 -738 676 -906 250 -118 496 -160 880 -151 239 6 350 20 518 67 411 114 718 402 847 797 75 231 93 436 89 1018 l-3 390 -487 3 -487 2 -4 -527 c-3 -451 -6 -536 -20 -582 -55 -183 -169 -287 -351 -322 -67 -12 -234 -11 -298 2 -138 29 -246 109 -301 223 -59 120 -57 34 -57 1952 0 1710 1 1763 19 1837 25 97 52 148 109 209 90 96 205 138 381 138 235 0 385 -80 463 -245 51 -109 57 -179 58 -603 l0 -382 488 2 487 3 3 275 c6 575 -28 816 -153 1075 -148 308 -396 520 -737 629 -202 65 -299 78 -593 81 -143 2 -278 1 -300 -1z"/>
                <path d="M27920 12664 c-218 -27 -442 -86 -584 -153 -99 -48 -233 -141 -320 -221 -223 -210 -356 -496 -396 -855 -8 -71 -10 -609 -7 -1855 3 -1610 4 -1762 20 -1840 70 -346 205 -591 433 -787 269 -230 612 -333 1111 -333 517 0 873 115 1147 371 177 165 297 374 361 626 56 223 55 182 55 2022 0 1115 -4 1727 -11 1786 -41 361 -163 632 -381 847 -145 144 -297 234 -514 307 -199 65 -328 83 -624 86 -140 2 -271 1 -290 -1z m412 -848 c188 -40 305 -157 356 -353 16 -63 17 -190 17 -1823 0 -1674 -1 -1758 -18 -1820 -54 -190 -160 -300 -334 -345 -76 -20 -280 -20 -356 0 -173 45 -283 155 -334 335 -17 62 -18 149 -18 1840 l0 1775 26 77 c77 226 229 325 499 327 52 0 125 -6 162 -13z"/>
                <path d="M22740 9645 l0 -2945 515 0 515 0 0 1325 0 1325 555 0 555 0 0 -1325 0 -1325 515 0 515 0 0 2945 0 2945 -515 0 -515 0 0 -1200 0 -1200 -555 0 -555 0 0 1200 0 1200 -515 0 -515 0 0 -2945z"/>
                <path d="M30440 9645 l0 -2945 515 0 515 0 0 2945 0 2945 -515 0 -515 0 0 -2945z"/>
                <path d="M32240 9645 l0 -2945 515 0 515 0 0 1261 0 1261 278 -5 c307 -4 340 -10 469 -72 149 -73 225 -216 253 -475 5 -54 10 -403 10 -805 0 -398 4 -757 10 -816 10 -107 36 -227 67 -306 l16 -43 524 0 c496 0 525 1 518 18 -5 9 -21 53 -37 97 -58 159 -60 193 -68 1095 -7 875 -8 891 -59 1104 -57 234 -153 403 -296 519 -62 50 -207 126 -282 148 -24 7 -43 16 -43 20 0 4 42 28 94 53 331 161 519 456 566 888 16 151 13 710 -5 855 -33 262 -105 457 -233 628 -33 44 -75 94 -93 111 -216 199 -505 305 -934 344 -63 6 -470 10 -947 10 l-838 0 0 -2945z m1632 2091 c208 -34 325 -145 374 -352 21 -90 32 -697 15 -831 -35 -269 -146 -402 -385 -463 -70 -18 -111 -20 -343 -20 l-263 0 0 833 c0 459 3 837 7 840 13 14 505 7 595 -7z"/>
                <path d="M36030 9645 l0 -2945 1405 0 1405 0 0 420 0 420 -890 0 -890 0 0 905 0 905 710 0 710 0 0 420 0 420 -710 0 -710 0 0 780 0 780 890 0 890 0 0 420 0 420 -1405 0 -1405 0 0 -2945z"/>
                <path d="M39430 9645 l0 -2945 875 0 c543 0 913 4 973 10 399 44 669 153 884 358 210 201 329 463 374 821 21 171 21 3341 0 3512 -89 718 -501 1098 -1278 1179 -57 6 -451 10 -963 10 l-865 0 0 -2945z m1740 2083 c135 -35 239 -118 290 -232 57 -126 55 -51 55 -1861 0 -1553 -1 -1675 -17 -1738 -45 -173 -139 -276 -302 -330 -55 -18 -94 -21 -393 -24 l-333 -5 0 2107 0 2107 323 -5 c236 -3 337 -8 377 -19z"/>
                <path d="M43250 9645 l0 -2945 1405 0 1405 0 0 420 0 420 -890 0 -890 0 0 905 0 905 710 0 710 0 0 420 0 420 -710 0 -710 0 0 780 0 780 890 0 890 0 0 420 0 420 -1405 0 -1405 0 0 -2945z"/>
                <path d="M46459 12568 c5 -13 257 -653 562 -1423 304 -770 554 -1411 556 -1425 3 -16 -203 -546 -583 -1505 -322 -814 -589 -1488 -591 -1498 -5 -16 21 -17 482 -15 l488 3 383 1020 c214 571 387 1020 394 1020 7 0 174 -443 385 -1020 l373 -1020 545 -3 546 -2 -33 82 c-18 46 -286 723 -596 1506 l-563 1422 561 1423 c309 782 564 1430 568 1440 6 16 -20 17 -482 15 l-489 -3 -355 -947 c-195 -521 -360 -948 -366 -948 -6 0 -160 411 -344 913 -183 501 -339 929 -347 950 l-15 37 -544 0 -544 0 9 -22z"/>
                <path d="M2127 11410 c-519 -93 -883 -576 -827 -1093 50 -448 378 -803 822 -888 35 -7 119 -12 188 -12 142 1 263 27 399 86 325 140 562 473 589 827 15 187 -15 353 -93 519 -56 116 -113 196 -207 287 -124 121 -277 209 -443 254 -89 24 -340 36 -428 20z"/>
                <path d="M4760 11405 c-210 -47 -372 -134 -516 -279 -182 -183 -278 -401 -291 -658 -15 -293 84 -547 295 -761 204 -208 514 -319 802 -287 237 26 431 116 602 278 184 176 292 414 305 677 19 391 -196 760 -549 938 -152 77 -245 99 -428 103 -110 3 -174 -1 -220 -11z"/>
                <path d="M7417 11410 c-125 -22 -289 -90 -397 -163 -66 -45 -196 -173 -245 -242 -89 -125 -151 -275 -175 -427 -20 -121 -8 -322 24 -433 109 -369 397 -634 781 -717 94 -20 323 -15 415 10 206 55 341 132 486 276 194 195 288 425 288 706 0 179 -30 303 -110 461 -124 241 -367 438 -629 509 -89 24 -349 36 -438 20z"/>
                <path d="M10010 11405 c-326 -73 -580 -271 -715 -557 -19 -40 -46 -113 -61 -163 -25 -82 -28 -105 -28 -260 0 -146 3 -182 22 -253 49 -179 138 -335 264 -460 301 -301 749 -381 1134 -202 509 236 725 840 481 1345 -128 263 -354 451 -648 536 -98 28 -351 36 -449 14z"/>
                <path d="M12690 11414 c-175 -35 -322 -99 -448 -194 -474 -357 -536 -1050 -131 -1484 245 -262 599 -375 946 -301 333 70 618 316 732 631 51 141 64 228 58 393 -5 168 -30 269 -98 405 -56 110 -90 158 -178 250 -127 131 -273 220 -448 272 -76 23 -110 27 -248 29 -88 2 -171 1 -185 -1z"/>
                <path d="M1000 9050 c-460 -45 -856 -398 -973 -870 -21 -85 -21 -90 -24 -1937 l-3 -1853 495 0 495 0 0 -2195 0 -2195 1310 0 1310 0 0 2195 0 2195 485 0 485 0 0 1819 c0 1578 -2 1830 -15 1907 -40 237 -147 446 -311 609 -188 187 -419 298 -675 325 -115 11 -2457 12 -2579 0z m727 -1314 c309 -146 564 -266 566 -266 3 0 238 111 524 246 285 136 560 266 611 290 l92 43 0 -827 0 -827 -34 51 c-93 138 -265 224 -445 224 -196 -1 -391 -111 -466 -264 -23 -46 -30 -77 -33 -141 -5 -100 11 -158 68 -239 l40 -57 -43 -18 c-23 -11 -103 -48 -177 -83 l-135 -65 -35 16 c-19 9 -99 46 -178 83 l-143 68 25 33 c36 46 73 134 81 188 28 194 -132 394 -362 453 -219 57 -476 -33 -585 -203 l-28 -45 0 827 0 827 48 -24 c26 -13 300 -143 609 -290z"/>
                <path d="M6300 9050 c-419 -41 -804 -350 -940 -757 -62 -187 -60 -111 -60 -2095 l0 -1808 495 0 495 0 0 -2195 0 -2195 1305 0 1305 0 0 2195 0 2195 490 0 490 0 -3 1858 c-3 2026 1 1882 -58 2053 -140 408 -512 705 -940 749 -115 11 -2457 12 -2579 0z m714 -1324 c296 -141 541 -256 545 -256 3 0 278 130 611 289 333 158 608 286 613 284 4 -2 7 -374 7 -826 -1 -777 -2 -821 -18 -799 -76 102 -98 124 -165 166 -168 105 -386 113 -568 20 -81 -41 -181 -146 -208 -219 -48 -127 -31 -260 45 -361 20 -25 32 -50 27 -55 -4 -4 -84 -44 -177 -87 l-168 -79 -174 81 c-95 44 -174 86 -174 92 0 6 7 17 16 25 9 7 29 40 46 73 78 154 30 353 -114 466 -65 52 -105 72 -197 100 -62 19 -88 22 -179 17 -180 -8 -310 -72 -404 -196 l-48 -62 0 825 0 825 73 -33 c39 -19 314 -149 611 -290z"/>
                <path d="M11545 9049 c-155 -16 -332 -81 -472 -171 -243 -158 -402 -379 -486 -675 l-21 -78 -3 -1867 -3 -1868 495 0 495 0 0 -2195 0 -2195 1305 0 1305 0 0 2195 0 2195 490 0 491 0 -4 1843 c-3 1684 -5 1848 -20 1917 -54 240 -160 433 -323 590 -187 180 -408 283 -659 310 -111 12 -2477 11 -2590 -1z m750 -1318 c475 -226 553 -260 575 -252 14 5 286 133 604 285 319 152 586 276 593 276 11 0 13 -150 13 -820 0 -451 -2 -820 -4 -820 -2 0 -19 24 -39 54 -86 129 -261 216 -437 216 -82 0 -204 -30 -273 -67 -67 -37 -149 -113 -181 -168 -78 -133 -66 -311 29 -422 l34 -40 -180 -85 -180 -86 -174 82 c-96 44 -175 85 -175 90 0 6 9 19 19 30 11 12 32 46 48 76 25 50 28 65 28 155 0 89 -3 106 -27 155 -59 120 -160 201 -305 247 -75 23 -95 25 -191 21 -199 -10 -340 -88 -439 -244 -9 -15 -12 164 -12 808 l-1 827 63 -28 c34 -16 309 -146 612 -290z"/>
                <path d="M36510 3651 c-114 -23 -179 -117 -158 -229 28 -150 231 -210 352 -103 53 47 75 164 43 228 -20 38 -80 91 -110 97 -53 11 -94 13 -127 7z"/>
                <path d="M19790 2600 l0 -980 163 2 162 3 5 420 c5 376 7 425 24 470 48 132 139 210 271 234 123 23 213 8 296 -49 43 -29 61 -51 89 -105 l35 -68 5 -451 5 -451 163 -3 162 -2 0 454 c0 510 -5 557 -65 684 -88 186 -272 286 -525 286 -168 0 -292 -38 -407 -125 l-53 -40 0 351 0 350 -165 0 -165 0 0 -980z"/>
                <path d="M27042 2603 l3 -978 163 -3 162 -2 0 980 0 980 -165 0 -165 0 2 -977z"/>
                <path d="M37412 2603 l3 -978 163 -3 162 -2 0 980 0 980 -165 0 -165 0 2 -977z"/>
                <path d="M18282 3475 c-93 -18 -128 -29 -229 -75 -196 -91 -353 -240 -445 -425 -112 -224 -129 -504 -45 -750 100 -293 338 -505 662 -592 89 -23 119 -26 270 -27 147 0 182 3 260 23 105 27 228 82 311 138 60 41 149 126 149 142 0 5 -47 54 -105 109 l-105 99 -60 -54 c-123 -112 -290 -169 -470 -160 -397 20 -659 330 -614 726 29 258 179 444 429 533 71 26 273 36 362 18 90 -17 214 -78 289 -142 l66 -56 108 102 c72 68 106 106 101 114 -4 7 -42 42 -84 78 -90 77 -237 153 -357 185 -104 27 -382 35 -493 14z"/>
                <path d="M29090 2545 l0 -925 170 0 170 0 0 270 0 270 247 -2 247 -3 186 -265 185 -265 183 -3 c100 -1 182 0 182 2 0 4 -255 370 -401 578 l-19 27 72 37 c95 50 204 156 247 243 45 88 71 198 71 297 0 261 -121 462 -342 567 -177 85 -274 97 -805 97 l-393 0 0 -925z m891 621 c196 -42 299 -160 301 -345 0 -121 -27 -193 -102 -268 -38 -39 -116 -77 -188 -92 -31 -6 -159 -11 -307 -11 l-255 0 0 365 0 365 243 0 c168 0 262 -5 308 -14z"/>
                <path d="M33190 3180 l0 -160 -115 0 -115 0 0 -130 0 -130 115 0 115 0 0 -362 c0 -394 6 -461 49 -553 49 -105 112 -162 226 -205 74 -27 251 -39 336 -21 58 12 172 62 183 79 6 10 -67 208 -83 224 -3 4 -27 -2 -51 -14 -53 -27 -153 -35 -204 -18 -58 19 -94 56 -111 113 -12 41 -15 117 -15 404 l0 353 190 0 190 0 0 130 0 130 -190 0 -190 0 0 160 0 160 -165 0 -165 0 0 -160z"/>
                <path d="M22387 3040 c-300 -37 -540 -245 -614 -530 -24 -94 -21 -281 5 -382 52 -194 176 -344 357 -434 120 -59 187 -75 331 -81 400 -17 694 203 771 577 18 89 13 242 -11 335 -79 299 -341 500 -676 518 -52 3 -125 2 -163 -3z m183 -281 c240 -38 381 -250 341 -510 -16 -101 -52 -176 -114 -237 -67 -65 -139 -101 -227 -115 -145 -22 -280 22 -375 125 -61 66 -92 136 -105 240 -31 249 109 460 330 497 76 12 77 12 150 0z"/>
                <path d="M24491 3035 c-139 -25 -232 -74 -306 -158 l-45 -52 0 103 0 102 -155 0 -155 0 2 -702 3 -703 160 0 160 0 6 405 c3 249 10 417 16 435 37 103 71 152 142 205 59 45 150 70 251 70 l70 0 0 155 0 155 -37 -1 c-21 0 -71 -7 -112 -14z"/>
                <path d="M25570 3040 c-109 -13 -230 -49 -325 -95 -140 -69 -135 -53 -63 -186 34 -63 63 -116 64 -118 1 -1 29 13 61 33 112 69 260 102 413 94 75 -5 102 -11 156 -38 96 -47 131 -101 149 -232 l6 -48 -203 0 c-225 0 -367 -12 -443 -36 -134 -43 -224 -117 -273 -222 -24 -51 -27 -69 -27 -162 1 -91 4 -112 26 -160 78 -168 256 -260 498 -260 178 0 288 38 388 132 l53 51 0 -87 0 -87 153 3 152 3 0 470 c-1 512 -3 539 -61 661 -31 65 -120 165 -179 200 -129 75 -341 108 -545 84z m460 -892 c0 -74 -4 -89 -30 -136 -58 -100 -182 -162 -324 -162 -145 0 -243 55 -266 149 -23 96 22 174 118 205 70 22 80 23 300 25 l202 1 0 -82z"/>
                <path d="M31748 3040 c-208 -26 -407 -149 -507 -314 -135 -223 -148 -495 -35 -726 122 -248 377 -390 699 -390 222 0 407 65 523 183 l43 44 -87 101 -87 101 -41 -35 c-143 -122 -394 -151 -576 -66 -101 47 -189 152 -214 255 l-6 27 549 0 549 0 7 48 c7 56 -9 214 -31 292 -22 75 -86 194 -141 258 -80 94 -208 170 -347 206 -71 19 -215 26 -298 16z m282 -291 c110 -52 196 -161 216 -271 l6 -38 -397 0 -397 0 7 38 c12 64 57 145 108 195 88 85 151 108 297 104 88 -2 114 -7 160 -28z"/>
                <path d="M34915 3039 c-110 -13 -219 -45 -319 -93 -143 -70 -138 -55 -65 -188 34 -62 63 -115 65 -117 2 -2 21 8 41 22 105 73 217 102 388 102 127 0 132 -1 196 -32 92 -46 141 -120 151 -229 l5 -51 -266 -6 c-182 -4 -287 -10 -333 -21 -147 -33 -254 -110 -310 -224 -31 -62 -33 -73 -33 -172 0 -93 3 -112 27 -162 50 -107 153 -192 285 -234 66 -21 263 -30 348 -15 94 17 183 60 243 118 l51 49 3 -81 3 -80 153 -3 153 -3 -4 503 c-3 429 -5 510 -19 549 -59 170 -156 270 -316 329 -122 44 -283 59 -447 39z m463 -887 c2 -59 -1 -83 -18 -117 -30 -62 -84 -112 -160 -149 -61 -29 -72 -31 -180 -31 -130 0 -171 14 -228 79 -72 83 -45 214 53 257 73 32 119 37 330 36 l200 -2 3 -73z"/>
                <path d="M36390 2325 l0 -705 163 2 162 3 3 703 2 702 -165 0 -165 0 0 -705z"/>
              </g>
            </svg>
          </a>
        </div>
      </div>
      <div className="large_screen_side_menu_profile_container">
        <div className="large_screen_side_menu_profile_client_avatar_container">
          {getClientData ? (
            getClientData.client ? (
              getClientData.client.profilePicture ? (
                <img
                  className="large_screen_side_menu_profile_client_photo_avatar"
                  src={LZString.decompressFromEncodedURIComponent(
                    getClientData.client.profilePicture
                  )}
                  alt={
                    getClientData.client.firstName[0].toUpperCase() +
                    getClientData.client.firstName.slice(1).toLowerCase() +
                    " " +
                    getClientData.client.lastName[0].toUpperCase() +
                    getClientData.client.lastName.slice(1).toLowerCase() +
                    " Profile Picture"
                  }
                />
              ) : (
                <FontAwesomeIcon
                  className="large_screen_side_menu_profile_client_avatar"
                  icon={faUserCircle}
                />
              )
            ) : (
              <FontAwesomeIcon
                className="large_screen_side_menu_profile_client_avatar"
                icon={faUserCircle}
              />
            )
          ) : getEmployeeData ? (
            getEmployeeData.employee ? (
              getEmployeeData.employee.profilePicture ? (
                <img
                  className="large_screen_side_menu_profile_client_photo_avatar"
                  src={LZString.decompressFromEncodedURIComponent(
                    getEmployeeData.employee.profilePicture
                  )}
                  alt={
                    getEmployeeData.employee.firstName[0].toUpperCase() +
                    getEmployeeData.employee.firstName.slice(1).toLowerCase() +
                    " " +
                    getEmployeeData.employee.lastName[0].toUpperCase() +
                    getEmployeeData.employee.lastName.slice(1).toLowerCase() +
                    " Profile Picture"
                  }
                />
              ) : (
                <FontAwesomeIcon
                  className="large_screen_side_menu_profile_client_avatar"
                  icon={faUserCircle}
                />
              )
            ) : (
              <FontAwesomeIcon
                className="large_screen_side_menu_profile_client_avatar"
                icon={faUserCircle}
              />
            )
          ) : (
            <FontAwesomeIcon
              className="large_screen_side_menu_profile_client_avatar"
              icon={faUserCircle}
            />
          )}
        </div>
        <div className="large_screen_side_menu_profile_contact_information_container">
          <div className="large_screen_side_menu_profile_name_container">
            <p>
              {getEmployeeData
                ? getEmployeeData.employee
                  ? getEmployeeData.employee.firstName
                    ? getEmployeeData.employee.firstName
                    : null
                  : null
                : null}{" "}
              {getEmployeeData
                ? getEmployeeData.employee
                  ? getEmployeeData.employee.lastName
                    ? getEmployeeData.employee.lastName
                    : null
                  : null
                : null}
              {getClientData
                ? getClientData.client
                  ? getClientData.client.firstName
                    ? getClientData.client.firstName
                    : null
                  : null
                : null}{" "}
              {getClientData
                ? getClientData.client
                  ? getClientData.client.lastName
                    ? getClientData.client.lastName
                    : null
                  : null
                : null}
            </p>
          </div>
          <div className="large_screen_side_menu_profile_membership_type_container">
            <p>Membership Type</p>
            <p>
              {getClientData
                ? "Default"
                : getEmployeeData
                ? getEmployeeData.employee
                  ? getEmployeeData.employee.employeeRole.includes("Admin")
                    ? "Admin"
                    : "Staff"
                  : "Staff"
                : "Staff"}
            </p>
          </div>
        </div>
        <div className="large_screen_side_menu_profile_email_and_phone_container">
          <div className="large_screen_side_menu_profile_email_container">
            <h2>Email Address</h2>
            <p>
              {getEmployeeData
                ? getEmployeeData.employee
                  ? getEmployeeData.employee.email
                  : null
                : null}
              {getClientData
                ? getClientData.client
                  ? getClientData.client.email
                  : null
                : null}
            </p>
          </div>
          <div className="large_screen_side_menu_profile_phone_number_container">
            <h2>Phone Number</h2>
            <p>
              {getEmployeeData
                ? getEmployeeData.employee
                  ? getEmployeeData.employee.phoneNumber
                  : null
                : null}
              {getClientData
                ? getClientData.client
                  ? getClientData.client.phoneNumber
                  : null
                : null}
            </p>
          </div>
        </div>
      </div>
      {guestConsentFormAccessToken ? null : (
        <div className="large_screen_side_menu_all_items_container">
          <div className="large_screen_side_menu_underline_separator" />
          <div className="large_screen_side_menu_item_container">
            <div
              className="large_screen_side_menu_item"
              onClick={navMenuScrollToHome}
            >
              <FontAwesomeIcon
                icon={faHome}
                className="large_screen_side_menu_item_icon"
              />
              <h2>Home</h2>
            </div>
          </div>
          {getEmployeeData ? (
            <div className="large_screen_side_menu_item_container">
              <Link
                className="large_screen_side_menu_item"
                to="/admin/activity"
              >
                <div
                  className="large_screen_side_menu_item_selected_border"
                  style={{
                    opacity: location.pathname.includes("activity") ? 1 : 0,
                  }}
                />
                <FontAwesomeIcon
                  icon={faBell}
                  className="large_screen_side_menu_item_icon"
                />
                <h2>Activity</h2>
                {adminNotifications ? (
                  adminNotifications.length > 0 ? (
                    adminNotifications.filter(
                      (notification) => notification.new === true
                    ).length > 0 ? (
                      <span className="fa-layers fa-fw">
                        <FontAwesomeIcon
                          className="menu_notifications_circle_counter"
                          icon={faCircle}
                        />
                        <p>
                          {adminNotifications.filter(
                            (notification) => notification.new === true
                          ).length < 10
                            ? adminNotifications.filter(
                                (notification) => notification.new === true
                              ).length
                            : "9+"}
                        </p>
                      </span>
                    ) : null
                  ) : null
                ) : null}
              </Link>
            </div>
          ) : null}
          {getEmployeeData ? (
            <div
              className="large_screen_side_menu_item_container"
              onClick={handleAdminResetNotifications}
            >
              <Link className="large_screen_side_menu_item" to="/admin/clients">
                <div
                  className="large_screen_side_menu_item_selected_border"
                  style={{
                    opacity: location.pathname.includes("/admin/clients")
                      ? 1
                      : 0,
                  }}
                />
                <FontAwesomeIcon
                  icon={faUsers}
                  className="large_screen_side_menu_item_icon"
                />
                <h2>Clients</h2>
              </Link>
            </div>
          ) : (
            <div className="large_screen_side_menu_item_container">
              <Link
                className="large_screen_side_menu_item"
                to="/account/clientprofile/upcomingappointments"
              >
                <div
                  className="large_screen_side_menu_item_selected_border"
                  style={{
                    opacity: location.pathname.includes("upcomingappointments")
                      ? 1
                      : 0,
                  }}
                />
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  className="large_screen_side_menu_item_icon"
                />
                <h2>Upcoming Appointments</h2>
              </Link>
            </div>
          )}{" "}
          {getEmployeeData ? (
            <div
              className="large_screen_side_menu_item_container"
              onClick={handleAdminResetNotifications}
            >
              <Link className="large_screen_side_menu_item" to="/admin/staff">
                <div
                  className="large_screen_side_menu_item_selected_border"
                  style={{
                    opacity: location.pathname.includes("staff") ? 1 : 0,
                  }}
                />
                <FontAwesomeIcon
                  icon={faBriefcase}
                  className="large_screen_side_menu_item_icon"
                />
                <h2>Staff</h2>
              </Link>
            </div>
          ) : (
            <div className="large_screen_side_menu_item_container">
              <Link
                className="large_screen_side_menu_item"
                to="/account/clientprofile/pastappointments"
              >
                <div
                  className="large_screen_side_menu_item_selected_border"
                  style={{
                    opacity: location.pathname.includes("pastappointments")
                      ? 1
                      : 0,
                  }}
                />
                <FontAwesomeIcon
                  icon={faHistory}
                  className="large_screen_side_menu_item_icon"
                />
                <h2>Past Appointments</h2>
              </Link>
            </div>
          )}{" "}
          {getEmployeeData ? (
            <div
              className="large_screen_side_menu_item_container"
              onClick={handleAdminResetNotifications}
            >
              <Link className="large_screen_side_menu_item" to="/admin/service">
                <div
                  className="large_screen_side_menu_item_selected_border"
                  style={{
                    opacity: location.pathname.includes("service") ? 1 : 0,
                  }}
                />
                <FontAwesomeIcon
                  icon={faBriefcase}
                  className="large_screen_side_menu_item_icon"
                />
                <h2>Service</h2>
              </Link>
            </div>
          ) : (
            null
          )}{" "}
          {getEmployeeData ? (
            <div
              className="large_screen_side_menu_item_container"
              onClick={handleAdminResetNotifications}
            >
              <Link className="large_screen_side_menu_item" to="/admin/store">
                <div
                  className="large_screen_side_menu_item_selected_border"
                  style={{
                    opacity: location.pathname.includes("store") ? 1 : 0,
                  }}
                />
                <FontAwesomeIcon
                  icon={faBriefcase}
                  className="large_screen_side_menu_item_icon"
                />
                <h2>Store</h2>
              </Link>
            </div>
          ) : (
            null
          )}{" "}
          {getEmployeeData ? (
            <>
              <div
                className="large_screen_side_menu_item_container"
                onClick={handleAdminResetNotifications}
              >
                <Link
                  className="large_screen_side_menu_item"
                  to="/admin/schedule"
                >
                  <div
                    className="large_screen_side_menu_item_selected_border"
                    style={{
                      opacity:
                        location.pathname.includes("schedule") &&
                        !location.pathname.includes("saltcave")
                          ? 1
                          : 0,
                    }}
                  />
                  <FontAwesomeIcon
                    icon={faCalendarWeek}
                    className="large_screen_side_menu_item_icon"
                  />
                  <h2>Schedule</h2>
                </Link>
              </div>
              <div className="large_screen_side_menu_underline_separator" />
            </>
          ) : (
            null
            // <div className="large_screen_side_menu_item_container">
            //   <Link
            //     className="large_screen_side_menu_item"
            //     to={`/account/clientprofile/consentform/${consentFormLastPageOpened}`}
            //   >
            //     <div
            //       className="large_screen_side_menu_item_selected_border"
            //       style={{
            //         opacity: location.pathname.includes("consentform") ? 1 : 0,
            //       }}
            //     />
            //     <FontAwesomeIcon
            //       icon={faFileSignature}
            //       className="large_screen_side_menu_item_icon"
            //     />
            //     <h2>Consent Form</h2>
            //   </Link>
            // </div>
          )}
          {/* {renderDownloadConsentFormButton()} */}
          {/* {getEmployeeData ? null : (
            <div className="large_screen_side_menu_extras_section">
              <div className="large_screen_side_menu_underline_separator" />
              <div className="large_screen_side_menu_item_container">
                <Link
                  className="large_screen_side_menu_item"
                  to="/"
                  onClick={() => dispatch(ACTION_BODY_SCROLL_ALLOW())}
                >
                  <FontAwesomeIcon
                    icon={faSpa}
                    className="large_screen_side_menu_item_icon"
                  />
                  <h2>My Skin Care Routine</h2>
                </Link>
              </div>{" "}
              <div className="large_screen_side_menu_item_container">
                <Link
                  className="large_screen_side_menu_item"
                  to="/"
                  onClick={() => dispatch(ACTION_BODY_SCROLL_ALLOW())}
                >
                  <FontAwesomeIcon
                    icon={faCommentDots}
                    className="large_screen_side_menu_item_icon"
                  />
                  <h2>Recommended Skin Care Routine</h2>
                </Link>
              </div>
              <div className="large_screen_side_menu_item_container">
                <Link
                  className="large_screen_side_menu_item"
                  to="/"
                  onClick={() => dispatch(ACTION_BODY_SCROLL_ALLOW())}
                >
                  <FontAwesomeIcon
                    icon={faPencilAlt}
                    className="large_screen_side_menu_item_icon"
                  />
                  <h2>Quizzes</h2>
                </Link>
              </div>
              <div className="large_screen_side_menu_item_container">
                <Link
                  className="large_screen_side_menu_item"
                  to="/"
                  onClick={() => dispatch(ACTION_BODY_SCROLL_ALLOW())}
                >
                  <FontAwesomeIcon
                    icon={faQuestion}
                    className="large_screen_side_menu_item_icon"
                  />
                  <h2>FAQ</h2>
                </Link>
              </div>
              <div className="large_screen_side_menu_item_container">
                <Link
                  className="large_screen_side_menu_item"
                  to="/"
                  onClick={() => dispatch(ACTION_BODY_SCROLL_ALLOW())}
                >
                  <FontAwesomeIcon
                    icon={faCamera}
                    className="large_screen_side_menu_item_icon"
                  />
                  <h2>Before / After Photos</h2>
                </Link>
              </div>
            </div>
          )} */}
        </div>
      )}
      {guestConsentFormAccessToken ? null : (
        <div className="large_screen_side_menu_item_container large_screen_side_menu_log_out">
          <div
            className="large_screen_side_menu_item"
            onClick={() => {
              dispatch(ACTION_LOG_OUT_CLICKED());
              if (cartIsActive) {
                dispatch(ACTION_CART_IS_NOT_ACTIVE());
              }
            }}
          >
            <FontAwesomeIcon
              icon={faSignOutAlt}
              className="large_screen_side_menu_item_icon"
            />
            <h2>Log Out</h2>
          </div>
        </div>
      )}
      <p className="large_screen_side_menu_copyright">
        &copy; {new Date().getFullYear()} GLOWLABORATORIES, LLC
      </p>
    </div>
  );
});

export default LargeScreenSideMenu;
