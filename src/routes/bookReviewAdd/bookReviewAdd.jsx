import EmojiPicker from "emoji-picker-react";
import React, { useState } from "react";
import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/button/button";
import styles from "./bookReviewAdd.module.css";

const BookReviewAdd = ({ backendAPI }) => {
  const [emojiPicker, setEmojiPicker] = useState(false);
  const [emojiUniCode, setEmojiUniCode] = useState();
  const location = useLocation();
  const book = location?.state?.book;

  const openEmojiPicker = () => {
    setEmojiPicker(true);
  };

  const onEmojiClick = (emoji) => {
    if (emoji) {
      setEmojiPicker(false);
      setEmojiUniCode(emoji.unified);
    }
  };

  const navigate = useNavigate();
  const goToReviewList = () => {
    navigate("/bookReview");
  };

  const titleRef = useRef();
  const textAreaRef = useRef();
  const onSubmit = (event) => {
    event.preventDefault();
    if (book.memberBookId) {
      const review = {
        memberBookId: book.memberBookId,
        title: titleRef.current.value || "",
        content: textAreaRef.current.value || "",
        emoji: emojiUniCode || "",
      };
      backendAPI.addReview(review).then((status) => {
        if (status === 200) {
          alert("감상문을 등록했습니다!");
          goToReviewList();
        } else {
          alert("등록에 실패했습니다.");
          goToReviewList();
        }
      });
    }
  };

  return (
    <>
      <button className={styles.close} onClick={goToReviewList}>
        <span className="material-symbols-outlined">close</span>
      </button>
      <div className={styles.component}>
        <h3 className={styles.h3}>{book.book.title} 감상문 쓰기</h3>
        <form className={styles.form}>
          <div className={styles.emojiContainer}>
            <div className={styles.emojiBox} onClick={openEmojiPicker}>
              <div className={styles.emojiPickerBox}>
                {emojiPicker && (
                  <div className={styles.emojiPicker}>
                    <EmojiPicker onEmojiClick={onEmojiClick} />
                  </div>
                )}
              </div>
              <span className={`material-symbols-outlined ${styles.emoji}`}>
                {emojiUniCode
                  ? String.fromCodePoint(`0x${emojiUniCode}`)
                  : "add_reaction"}
              </span>
            </div>
            <span className={styles.text}>
              책을 읽고 난 후 어땠는지 이모티콘으로 표현해주세요!
            </span>
          </div>
          <div className={styles.contents}>
            <input
              ref={titleRef}
              className={styles.input}
              placeholder="감상문 제목"></input>
            <textarea ref={textAreaRef} className={styles.textarea}></textarea>
          </div>
          <div className={styles.button}>
            <Button text="등록" onClick={onSubmit} />
          </div>
        </form>
      </div>
    </>
  );
};

export default BookReviewAdd;
