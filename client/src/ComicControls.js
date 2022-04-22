import { Fragment } from 'react';

const ComicControls = ({
    currComicNum,
    setCurrComicNum,
    comicNumUpperBound,
    setDoFetchRandomComic,
    setDoFetchSpecificComic,
    isLoading,
}) => {
    return (
        <Fragment>
            <div className="flex justify-center">
                <button
                    className="font-amatic font-bold text-2xl mx-3 sm:mx-6 text-white py-2 px-4 bg-amber-500 rounded"
                    onClick={() => {
                        setCurrComicNum(currComicNum - 1);
                        setDoFetchSpecificComic(true);
                    }}
                    disabled={currComicNum === 1 || isLoading === true}
                >
                    prev
                </button>
                <button
                    className="font-amatic font-bold text-2xl mx-3 sm:mx-6 text-white py-2 px-4 bg-amber-500 rounded"
                    onClick={() => setDoFetchRandomComic(true)}
                >
                    random
                </button>
                <button
                    className="font-amatic font-bold text-2xl mx-3 sm:mx-6 text-white py-2 px-4 bg-amber-500 rounded"
                    onClick={() => {
                        setCurrComicNum(currComicNum + 1);
                        setDoFetchSpecificComic(true);
                    }}
                    disabled={currComicNum === comicNumUpperBound}
                >
                    next
                </button>
            </div>
        </Fragment>
    );
};

export default ComicControls;
