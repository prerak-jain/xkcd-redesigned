import { Fragment, useState, useEffect } from 'react';
import './ComicContent.css';

const ComicContent = ({
    content,
    comicNumUpperBound,
    currComicNum,
    setCurrComicNum,
    setDoFetchRandomComic,
    setDoFetchSpecificComic,
}) => {
    const thresholdDistance = 110;
    const maxAllowedTime = 1000;
    const [startX, setStartX] = useState(0);
    const [distX, setDistX] = useState(0);
    const [startTime, setStartTime] = useState(0);
    const [myLatestTap, setMyLatestTap] = useState(0);
    useEffect(() => {
        const imgContainer = document.querySelector('.img-container');
        const backBtn = document.querySelector('.left-arrow-btn');
        const nextBtn = document.querySelector('.right-arrow-btn');
        function touchStartHandler(e) {
            let touchobj = e.changedTouches[0];
            setDistX(0);
            setStartX(touchobj.pageX);
            setStartTime(new Date().getTime());
            e.preventDefault();
        }
        function touchMoveHandler(e) {
            let touchobj = e.changedTouches[0];
            setDistX(touchobj.pageX - startX);
            if (Math.abs(distX) >= thresholdDistance) {
                if (distX > 0) {
                    if (currComicNum !== 1)
                        backBtn.style.visibility = 'visible';
                } else {
                    if (currComicNum !== comicNumUpperBound)
                        nextBtn.style.visibility = 'visible';
                }
            } else {
                backBtn.style.visibility = 'hidden';
                nextBtn.style.visibility = 'hidden';
            }
            e.preventDefault();
        }
        function touchEndHandler(e) {
            let timeElapsed = new Date().getTime() - startTime;
            if (timeElapsed <= maxAllowedTime) {
                if (Math.abs(distX) >= thresholdDistance) {
                    if (distX > 0 && currComicNum !== 1) {
                        setCurrComicNum(currComicNum - 1);
                        setDoFetchSpecificComic(true);
                        backBtn.style.visibility = 'hidden';
                    } else {
                        if (currComicNum !== comicNumUpperBound) {
                            setCurrComicNum(currComicNum + 1);
                            setDoFetchSpecificComic(true);
                            nextBtn.style.visibility = 'hidden';
                        }
                    }
                } else {
                    backBtn.style.visibility = 'hidden';
                    nextBtn.style.visibility = 'hidden';
                }
            } else {
                backBtn.style.visibility = 'hidden';
                nextBtn.style.visibility = 'hidden';
            }
            e.preventDefault();
        }
        imgContainer.addEventListener('touchstart', touchStartHandler);
        imgContainer.addEventListener('touchmove', touchMoveHandler);
        imgContainer.addEventListener('touchend', touchEndHandler);
        return () => {
            imgContainer.removeEventListener('touchstart', touchStartHandler);
            imgContainer.removeEventListener('touchmove', touchMoveHandler);
            imgContainer.removeEventListener('touchend', touchEndHandler);
        };
    }, [
        currComicNum,
        distX,
        setCurrComicNum,
        comicNumUpperBound,
        setDoFetchSpecificComic,
        startTime,
        startX,
    ]);
    useEffect(() => {
        const modal = document.querySelector('.img-modal');
        const img = document.querySelector('.comic-img');
        const modalImg = document.querySelector('.modal-img');
        const captionText = document.querySelector('.caption');
        const span = document.querySelector('.close');
        function onImgDoubleClickHandler(e) {
            modal.style.display = 'flex';
            modal.style.flexDirection = 'column';
            modal.style.alignItems = 'center';
            modal.style.justifyContent = 'center';
            modalImg.src = content.img;
            captionText.innerHTML =
                content.alt !== '' ? content.alt : content.transcript;
        }
        function doubleTapHandler(e) {
            var now = new Date().getTime();
            var timeSince = now - myLatestTap;
            if (timeSince < 500 && timeSince > 0) {
                onImgDoubleClickHandler();
            }
            setMyLatestTap(new Date().getTime());
        }
        img.ondblclick = onImgDoubleClickHandler;
        img.addEventListener('touchstart', doubleTapHandler);
        span.onclick = function () {
            modal.style.display = 'none';
        };
        return () => {
            img.removeEventListener('touchstart', doubleTapHandler);
        };
    }, [content.img, content.alt, content.transcript, myLatestTap]);
    return (
        <Fragment>
            <header className="flex justify-center">
                <h1 className="text-xl mt-4 font-amatic text-4xl font-bold">
                    {content.safe_title}
                </h1>
            </header>
            <main className="my-5">
                <div className="img-container flex xxs:w-11/12 sm:w-10/12 h-80 px-4 justify-center items-center m-auto">
                    <button className="left-arrow-btn p-2 invisible mr-1 p-1 bg-amber-500 rounded-full">
                        <i className="fa-solid fa-arrow-left text-white"></i>
                    </button>
                    <img
                        alt={
                            content.alt !== ''
                                ? content.alt
                                : content.transcript
                        }
                        src={content.img}
                        className="comic-img w-auto h-auto max-h-72"
                        title={
                            content.alt !== ''
                                ? content.alt
                                : content.transcript
                        }
                    />
                    <button className="right-arrow-btn p-2 invisible ml-1 p-1 bg-amber-500 rounded-full">
                        <i className="fa-solid fa-arrow-right text-white"></i>
                    </button>
                </div>
            </main>
            <div className="img-modal hidden z-1 w-full h-full overflow-auto fixed top-0 right-0 z-1 m-auto">
                <span className="close">&times;</span>
                <img
                    className="modal-img h-auto w-auto"
                    alt={content.alt !== '' ? content.alt : content.transcript}
                />
                <div className="caption flex justify-center mt-3 py-1"></div>
            </div>
        </Fragment>
    );
};

export default ComicContent;
