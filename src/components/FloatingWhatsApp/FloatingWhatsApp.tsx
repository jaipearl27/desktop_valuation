"use client"
import React, {
  useReducer,
  useEffect,
  useCallback,
  useRef,
  useMemo
} from "react";
import { reducer } from "./reducer";
import { WhatsappSVG, CloseSVG, CheckSVG, SendSVG } from "./Icons";
import Image from "next/image";

export function FloatingWhatsApp({
  onClick,
  onSubmit,
  onClose,
  onNotification,
  onLoopDone,

  phoneNumber = "9687557070",
  accountName = "Desktop Valuation",
  statusMessage = "Typically replies within 1 hour",
  chatMessage = "Hello there! 🤝 \nHow can we help?",
  placeholder = "Type a message..",

  allowClickAway = false,
  allowEsc = false,
  avatar,
  notification = true,
  notificationDelay = 60,
  notificationLoop = 0,
  notificationSound = false,
  notificationStyle,
  notificationClassName = "floating-whatsapp-notification",

  buttonStyle,
  buttonClassName = "floating-whatsapp-button",

  chatboxHeight = 320,
  chatboxStyle,
  chatboxClassName = "floating-whatsapp-chatbox",

  darkMode = false,
  style,
  className = "floating-whatsapp"
}: any) {
  const [{ isOpen, isDelay, isNotification }, dispatch] = useReducer(reducer, {
    isOpen: false,
    isDelay: true,
    isNotification: false
  });

  const timeNow = useMemo(
    () =>
      new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    []
  );

  const inputRef = useRef(null);
  const soundRef = useRef(null);
  const loops = useRef(0);
  const notificationInterval = useRef(0);

  const handleNotification = useCallback(() => {
    if (!notification) return;

    dispatch({ type: "notification" });
    if (onNotification) onNotification();
    if (notificationLoop > 0) {
      loops.current += 1;

      if (notificationSound) {
        if (soundRef.current) {
          soundRef.current.currentTime = 0;
          soundRef.current.play();
        }
      }
      if (loops.current === notificationLoop) {
        clearInterval(notificationInterval.current);
        if (onLoopDone) onLoopDone();
      }
    }
  }, [
    notification,
    notificationLoop,
    notificationSound,
    onNotification,
    onLoopDone
  ]);

  useEffect(() => {
    const delayInSecond = notificationDelay * 1000;
    if (delayInSecond < 10)
      return console.error(
        "notificationDelay prop value must be at least 10 seconds."
      );

    notificationInterval.current = window.setInterval(
      handleNotification,
      delayInSecond
    );

    return () => clearInterval(notificationInterval.current);
  }, [handleNotification, notificationDelay]);

  const handleOpen = useCallback(
    (event) => {
      event.stopPropagation();

      console.log("test");
      if (isOpen) return;
      clearInterval(notificationInterval.current);
      dispatch({ type: "open" });
      setTimeout(() => dispatch({ type: "delay" }), 2000);
      if (onClick) onClick(event);
    },
    [isOpen, onClick]
  );

  const handleClose = useCallback(() => {
    dispatch({ type: "close" });

    if (onClose) onClose();
  }, [onClose]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!inputRef.current?.value) return;

    window.open(
      `https://api.whatsapp.com/send/?phone=${phoneNumber}&text=${inputRef.current.value}`
    );
    if (onSubmit) onSubmit(event, inputRef.current.value);
    inputRef.current.value = "";
  };

  useEffect(() => {
    const onClickOutside = () => {
      if (!allowClickAway || !isOpen) return;

      handleClose();
    };
    document.addEventListener("click", onClickOutside, false);

    return () => document.removeEventListener("click", onClickOutside);
  }, [allowClickAway, isOpen, handleClose]);

  useEffect(() => {
    const onEscKey = (event) => {
      if (!allowEsc || !isOpen) return;

      if (event.key === "Escape") handleClose();
    };

    document.addEventListener("keydown", onEscKey, false);

    return () => document.removeEventListener("keydown", onEscKey);
  }, [allowEsc, isOpen, handleClose]);

  return (
    <div
      className={`floatingWhatsapp ${
        darkMode ? `dark` : ""
      } ${className}`}
      style={style}
    >
      <div
        className={`whatsappButton buttonClassName`}
        onClick={handleOpen}
        style={buttonStyle}
        aria-hidden="true"
      >
        <WhatsappSVG />
        {isNotification && (
          <span
            className={`notificationIndicator notificationClassName`}
            style={notificationStyle}
          >
            1
          </span>
        )}
      </div>

      <div
        className={`whatsappChatBox ${
          isOpen ? "open" : "close"
        } ${chatboxClassName}`}
        onClick={(event) => {event.stopPropagation()}}
        aria-hidden="true"
        style={{ height: isOpen ? chatboxHeight : 0, ...chatboxStyle }}
      >
        <header className={"chatHeader"}>
          <div className={"avatar"}>
            <Image src={avatar} width="60" height="60" alt="whatsapp-avatar" />
          </div>
          <div className={"status"}>
            <span className={"statusTitle"}>{accountName}</span>
            <span className={"statusSubtitle"}>{statusMessage}</span>
          </div>
          <div className={"close"} onClick={handleClose} aria-hidden="true">
            <CloseSVG />
          </div>
        </header>

        <div
          className={"chatBody"}
        >
          {isDelay ? (
            <div className={"chatBubble"}>
              <div className={"typing"}>
                <div className={"dot"} />
                <div className={"dot"} />
                <div className={"dot"} />
              </div>
            </div>
          ) : (
            <div className={"message"}>
              <span className={"triangle"} />
              <span className={"accountName"}>{accountName}</span>
              <p className={"messageBody"}>{chatMessage}</p>
              <span className={"messageTime"}>
                {timeNow}
                <span style={{ marginLeft: 5 }}>
                  <CheckSVG />
                </span>
              </span>
            </div>
          )}
        </div>

        <footer className={"chatFooter"}>
          <form onSubmit={handleSubmit}>
            <input
              className={"input"}
              placeholder={placeholder}
              ref={inputRef}
              dir="auto"
            />
            <button type="submit" className={"buttonSend"}>
              <SendSVG />
            </button>
          </form>
        </footer>
      </div>
    </div>
  );
}
