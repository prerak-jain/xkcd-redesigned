import React, { useState, useEffect, Fragment } from 'react';
import './App.css';
import ComicContent from './ComicContent';
import ComicControls from './ComicControls';

const App = () => {
    const [data, setData] = useState();
    const [hasData, setHasData] = useState(false);
    const [comicNumUpperBound, setComicNumUpperBound] = useState(0);
    const [currComicNum, setCurrComicNum] = useState(0);
    const [doFetchSpecificComic, setDoFetchSpecificComic] = useState(false);
    const [doFetchRandomComic, setDoFetchRandomComic] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const fetchLatestComic = async () => {
            try {
                setIsLoading(true);
                fetch(`http://localhost:3001/info.0.json`)
                    .then((res) => res.json())
                    .then((data) => {
                        setIsLoading(false);
                        setData(data);
                        setCurrComicNum(data.num);
                        setComicNumUpperBound(data.num);
                        setHasData(true);
                    });
            } catch (err) {
                console.log(err);
            }
        };
        fetchLatestComic();
    }, []);

    useEffect(() => {
        if (doFetchSpecificComic) {
            const fetchCurrentComic = async () => {
                try {
                    setIsLoading(true);
                    fetch(`http://localhost:3001/${currComicNum}/info.0.json`)
                        .then((res) => res.json())
                        .then((data) => {
                            setIsLoading(false);
                            setData(data);
                            setHasData(true);
                            setDoFetchSpecificComic(false);
                        });
                } catch (err) {
                    console.log(err);
                }
            };
            fetchCurrentComic();
        }
    }, [doFetchSpecificComic, currComicNum]);

    useEffect(() => {
        if (doFetchRandomComic) {
            const fetchRandomComic = async () => {
                try {
                    setIsLoading(true);
                    fetch(`http://localhost:3001/randomComic`)
                        .then((res) => res.json())
                        .then((data) => {
                            setIsLoading(false);
                            setData(data);
                            setCurrComicNum(data.num);
                            setHasData(true);
                            setDoFetchRandomComic(false);
                        });
                } catch (err) {
                    console.log(err);
                }
            };
            fetchRandomComic();
        }
    }, [doFetchRandomComic]);
    return (
        <Fragment>
            <header className="xkcd-header flex justify-center my-2 mb-4">
                <h1 className="xxs:text-2xl xs:text-3xl sm:text-4xl font-bold font-sans py-2">
                    xkcd
                </h1>
            </header>
            <main>
                <section>
                    {isLoading && (
                        <div class="flex justify-center items-center h-96 my-6">
                            <svg className="spinner" viewBox="0 0 50 50">
                                <circle
                                    className="path"
                                    cx="25"
                                    cy="25"
                                    r="20"
                                    fill="none"
                                    stroke-width="5"
                                ></circle>
                            </svg>
                        </div>
                    )}
                    {!isLoading && hasData && (
                        <ComicContent
                            content={data}
                            comicNumUpperBound={comicNumUpperBound}
                            currComicNum={currComicNum}
                            setCurrComicNum={setCurrComicNum}
                            setDoFetchRandomComic={setDoFetchRandomComic}
                            setDoFetchSpecificComic={setDoFetchSpecificComic}
                        />
                    )}
                </section>
                <section>
                    <ComicControls
                        comicNumUpperBound={comicNumUpperBound}
                        currComicNum={currComicNum}
                        setCurrComicNum={setCurrComicNum}
                        setDoFetchRandomComic={setDoFetchRandomComic}
                        setDoFetchSpecificComic={setDoFetchSpecificComic}
                        isLoading={isLoading}
                    />
                </section>
            </main>
        </Fragment>
    );
};

export default App;
