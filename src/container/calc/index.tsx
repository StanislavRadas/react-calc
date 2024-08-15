import React, {useEffect, useState} from "react";
import "./index.css";


const Calculator: React.FC = () => {

    const [output, setOutput] = useState<string>("");
    const [activeOperator, setActiveOperator] = useState<string | null>(null);
    const [pendingValue, setPendingValue] = useState<string | null>(null);
    const [lastOperator, setLastOperator] = useState<string | null>(null);
    const [theme, setTheme] = useState<string>("dark")
    const MAX_LENGHT = 10;

    const ThemeIconDark: React.FC = () => {
    return (
        <svg width="72" height="32" viewBox="0 0 72 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_5_25016)">
        <rect width="72" height="32" rx="16" fill="#2E2F38"/>
        <g opacity="0.7">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M48.0324 10.2319C46.2001 11.4947 45 13.608 45 15.9999C45 19.8659 48.134 22.9999 52 22.9999C54.3918 22.9999 56.5049 21.8 57.7678 19.9678C57.5146 19.9893 57.2585 20.0002 57 20.0002C52.0294 20.0002 48 15.9708 48 11.0002C48 10.7415 48.0109 10.4852 48.0324 10.2319ZM43 15.9999C43 12.0417 45.5546 8.68279 49.1021 7.47693L50.3707 8.74561C50.1306 9.45177 50 10.2097 50 11.0002C50 14.8662 53.134 18.0002 57 18.0002C57.7904 18.0002 58.5482 17.8696 59.2542 17.6296L60.5228 18.8983C59.3168 22.4455 55.958 24.9999 52 24.9999C47.0294 24.9999 43 20.9705 43 15.9999Z" fill="#4B5EFC"/>
        </g>
        <circle cx="16" cy="16" r="12" fill="#4E505F"/>
        </g>
        <defs>
        <clipPath id="clip0_5_25016">
        <rect width="72" height="32" rx="16" fill="white"/>
        </clipPath>
        </defs>
        </svg>
    )
    }

    const ThemeIconLight: React.FC = () => {
    return (
        <svg width="72" height="32" viewBox="0 0 72 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_5_25021)">
        <rect width="72" height="32" rx="16" fill="white"/>
        <g opacity="0.7">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M21 6V7V9V10H19V9V7V6H21ZM10 15H11H13H14V17H13H11H10V15ZM27 15H26V17H27H29H30V15H29H27ZM21 22V23V25V26H19V25V23V22H21ZM25.6568 23.0711L26.364 23.7782L27.7782 22.364L27.0711 21.6569L25.6568 20.2427L24.9497 19.5356L23.5355 20.9498L24.2426 21.6569L25.6568 23.0711ZM15.0502 12.4645L14.3431 11.7574L12.9289 10.3432L12.2218 9.63608L13.636 8.22187L14.3431 8.92897L15.7573 10.3432L16.4644 11.0503L15.0502 12.4645ZM27.0711 10.3431L27.7782 9.63599L26.364 8.22177L25.6568 8.92888L24.2426 10.3431L23.5355 11.0502L24.9497 12.4644L25.6568 11.7573L27.0711 10.3431ZM16.4644 20.9497L15.7573 21.6568L14.3431 23.071L13.636 23.7781L12.2218 22.3639L12.9289 21.6568L14.3431 20.2426L15.0502 19.5355L16.4644 20.9497ZM18 16C18 14.8954 18.8954 14 20 14C21.1046 14 22 14.8954 22 16C22 17.1046 21.1046 18 20 18C18.8954 18 18 17.1046 18 16ZM20 12C17.7909 12 16 13.7909 16 16C16 18.2091 17.7909 20 20 20C22.2091 20 24 18.2091 24 16C24 13.7909 22.2091 12 20 12Z" fill="#4B5EFC"/>
        </g>
        <circle cx="56" cy="16" r="12" fill="#D2D3DA"/>
        </g>
        <defs>
        <clipPath id="clip0_5_25021">
        <rect width="72" height="32" rx="16" fill="white"/>
        </clipPath>
        </defs>
        </svg>
    )
    }

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            setTheme(savedTheme)
        }
    }, [])

    const handleTheme = () => {
        setTheme(prevTheme => {
            const newTheme = prevTheme === "dark" ? "light" : "dark";
            localStorage.setItem("theme", newTheme);
            return newTheme
        });
        
    }

    const handleClick = (input: string) => {
        if (output.length < MAX_LENGHT) {
            if (input === ".") {
                if (!output.includes(".")) {
                    setOutput(prevOutput => prevOutput + input);
                }
            } else {
                setOutput(prevOutput => prevOutput + input);
            }
                
        }
    }
    
    const handleOperatorClick = (operator: string) => {
        setActiveOperator(operator);
        setLastOperator(operator);

        if (output && pendingValue !== null) {
            setPendingValue(output);
            setOutput("");
        } else {
            setPendingValue(output);
            setOutput("");
        }
    }

    const handleClear = () => {
        setOutput("");
        setActiveOperator(null);
        setPendingValue(null);
        setLastOperator(null);
    }

    const deleteLastChart = () => {
        const minusLastChar = output.slice(0, -1)
        setOutput(minusLastChar)
    }

    const percentCount = () => {
        const percentValue = Number(output) / 100;
        setOutput(percentValue.toString())
    }

    const toggleSign = () => {
        const num = Number(output);
        setOutput((num * -1).toString());
    };


    const handleCalculate = () => {
        try {
            if (pendingValue !== null && lastOperator && output) {
                let result;
                const pending = parseFloat(pendingValue);
                const current = parseFloat(output);
                switch (lastOperator) {
                    case "+":
                        result = pending + current;
                        break;
                    case "-":
                        result = pending - current;
                        break;
                    case "/":
                        result = pending / current;
                        break;
                    case "*":
                        result = pending * current
                        break;
                    default:
                        return;
                }
                setOutput(result.toString().slice(0, MAX_LENGHT));
                setPendingValue(null);
                setLastOperator(null);
                setActiveOperator(null);
            }
        } catch (e) {
            setOutput("Error")
        }
    }

    return (
        <div className="page">
            <div className="page__block">
                <div className={`page__content ${theme}`}>
                    <div onClick={handleTheme} className="icon__theme">
                        {theme === "dark" ? <ThemeIconDark/> : <ThemeIconLight/>}
                    </div>
                    <div className="number__block">
                        <span className={`output ${theme}`}>{output}</span>
                    </div>
                    <div className="btn__block">
                        <button onClick={() => handleClear()} className={`btn__number ${theme === "light" ? "light__btn" : ""}`}>
                            <svg width="19" height="23" viewBox="0 0 19 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.5113 16.592C18.0633 17.7867 17.4233 18.8213 16.5913 19.696C15.7593 20.5493 14.7779 21.2 13.6473 21.648C12.5379 22.096 11.3219 22.32 9.99925 22.32C7.99392 22.32 6.25525 21.8827 4.78325 21.008C3.33258 20.112 2.20192 18.8533 1.39125 17.232C0.601917 15.6107 0.20725 13.68 0.20725 11.44C0.20725 9.2 0.601917 7.26933 1.39125 5.648C2.20192 4.02667 3.33258 2.77867 4.78325 1.904C6.25525 1.008 7.97258 0.559999 9.93525 0.559999C11.3006 0.559999 12.5166 0.752 13.5833 1.136C14.6499 1.49867 15.5566 2.05333 16.3033 2.8C17.0713 3.52533 17.6793 4.42133 18.1273 5.488L15.5993 6.672C15.1299 5.456 14.4473 4.53867 13.5513 3.92C12.6766 3.28 11.5353 2.96 10.1273 2.96C8.69792 2.96 7.43925 3.30133 6.35125 3.984C5.26325 4.64533 4.40992 5.60533 3.79125 6.864C3.19392 8.12267 2.89525 9.648 2.89525 11.44C2.89525 13.2107 3.18325 14.736 3.75925 16.016C4.33525 17.2747 5.15658 18.2453 6.22325 18.928C7.28992 19.5893 8.54858 19.92 9.99925 19.92C11.4073 19.92 12.6339 19.568 13.6793 18.864C14.7246 18.1387 15.4819 17.0613 15.9513 15.632L18.5113 16.592Z" fill={`${theme === "light" ? "#000" : "white"}`} />
                            </svg>
                        </button>
                        <button onClick={() => toggleSign()} className={`btn__number ${theme === "light" ? "light__btn" : ""}`}>
                            <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M23.5821 7.55469L24.1367 6.72264L22.4726 5.61324L21.9179 6.44529L9.91795 24.4453L9.36325 25.2773L11.0273 26.3867L11.5821 25.5547L23.5821 7.55469ZM9.75 5.99999V6.99999V8.99999H11.75H12.75V11H11.75H9.75V13V14H7.75V13V11H5.75H4.75V8.99999H5.75H7.75V6.99999V5.99999H9.75ZM21.75 21H20.75V23H21.75H27.75H28.75V21H27.75H21.75Z" fill={`${theme === "light" ? "#000" : "white"}`}/>
                            </svg>
                        </button>
                        <button onClick={() => percentCount()} className={`btn__number ${theme === "light" ? "light__btn" : ""}`}>
                            <svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.55688 22L17.9969 0.879999H20.4289L6.98888 22H4.55688ZM5.16488 0.559999C6.21021 0.559999 7.10621 0.805333 7.85288 1.296C8.62088 1.76533 9.20754 2.43733 9.61288 3.312C10.0395 4.18667 10.2529 5.21067 10.2529 6.384C10.2529 7.55733 10.0395 8.58133 9.61288 9.456C9.20754 10.3307 8.62088 11.0133 7.85288 11.504C7.10621 11.9733 6.21021 12.208 5.16488 12.208C4.14088 12.208 3.24488 11.9733 2.47688 11.504C1.70888 11.0133 1.11154 10.3307 0.684875 9.456C0.279542 8.58133 0.0768751 7.55733 0.0768751 6.384C0.0768751 5.21067 0.279542 4.18667 0.684875 3.312C1.11154 2.43733 1.70888 1.76533 2.47688 1.296C3.24488 0.805333 4.14088 0.559999 5.16488 0.559999ZM5.16488 2.576C4.56754 2.576 4.05554 2.72533 3.62888 3.024C3.20221 3.32266 2.88221 3.76 2.66888 4.336C2.45554 4.89067 2.34888 5.57333 2.34888 6.384C2.34888 7.17333 2.45554 7.856 2.66888 8.432C2.88221 9.008 3.20221 9.44533 3.62888 9.744C4.05554 10.0427 4.56754 10.192 5.16488 10.192C5.78354 10.192 6.29554 10.0427 6.70088 9.744C7.12754 9.44533 7.44754 9.008 7.66088 8.432C7.87421 7.856 7.98088 7.17333 7.98088 6.384C7.98088 5.57333 7.87421 4.89067 7.66088 4.336C7.44754 3.76 7.12754 3.32266 6.70088 3.024C6.29554 2.72533 5.78354 2.576 5.16488 2.576ZM19.8209 10.672C20.8662 10.672 21.7622 10.9173 22.5089 11.408C23.2769 11.8773 23.8635 12.5493 24.2689 13.424C24.6955 14.2987 24.9089 15.3227 24.9089 16.496C24.9089 17.6693 24.6955 18.6933 24.2689 19.568C23.8635 20.4427 23.2769 21.1253 22.5089 21.616C21.7622 22.0853 20.8662 22.32 19.8209 22.32C18.7969 22.32 17.9009 22.0853 17.1329 21.616C16.3649 21.1253 15.7675 20.4427 15.3409 19.568C14.9355 18.6933 14.7329 17.6693 14.7329 16.496C14.7329 15.3227 14.9355 14.2987 15.3409 13.424C15.7675 12.5493 16.3649 11.8773 17.1329 11.408C17.9009 10.9173 18.7969 10.672 19.8209 10.672ZM19.8209 12.688C19.2235 12.688 18.7115 12.8373 18.2849 13.136C17.8582 13.4347 17.5382 13.872 17.3249 14.448C17.1115 15.0027 17.0049 15.6853 17.0049 16.496C17.0049 17.2853 17.1115 17.968 17.3249 18.544C17.5382 19.12 17.8582 19.5573 18.2849 19.856C18.7115 20.1547 19.2235 20.304 19.8209 20.304C20.4395 20.304 20.9515 20.1547 21.3569 19.856C21.7835 19.5573 22.1035 19.12 22.3169 18.544C22.5302 17.968 22.6369 17.2853 22.6369 16.496C22.6369 15.6853 22.5302 15.0027 22.3169 14.448C22.1035 13.872 21.7835 13.4347 21.3569 13.136C20.9515 12.8373 20.4395 12.688 19.8209 12.688Z" fill={`${theme === "light" ? "#000" : "white"}`}/>
                            </svg>
                        </button>
                        <button onClick={() => handleOperatorClick("/")} className={`btn__number ${activeOperator === "/" ? " active" : ""} blue`}>
                            <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.0338 7.672V10.072H0.48175V7.672H16.0338ZM8.25775 13.08C8.87642 13.08 9.37775 13.272 9.76175 13.656C10.1458 14.04 10.3378 14.5413 10.3378 15.16C10.3378 15.7787 10.1458 16.28 9.76175 16.664C9.37775 17.048 8.87642 17.24 8.25775 17.24C7.63908 17.24 7.13775 17.048 6.75375 16.664C6.36975 16.28 6.17775 15.7787 6.17775 15.16C6.17775 14.5413 6.36975 14.04 6.75375 13.656C7.13775 13.272 7.63908 13.08 8.25775 13.08ZM8.25775 0.567999C8.87642 0.567999 9.37775 0.759999 9.76175 1.144C10.1458 1.528 10.3378 2.02933 10.3378 2.648C10.3378 3.26667 10.1458 3.768 9.76175 4.152C9.37775 4.536 8.87642 4.728 8.25775 4.728C7.63908 4.728 7.13775 4.536 6.75375 4.152C6.36975 3.768 6.17775 3.26667 6.17775 2.648C6.17775 2.02933 6.36975 1.528 6.75375 1.144C7.13775 0.759999 7.63908 0.567999 8.25775 0.567999Z" fill="white"/>
                            </svg>
                        </button>
                        <button onClick={() => handleClick("7")} className={`btn__number ${theme === "light" ? "light__btn" : ""}`}>7</button>
                        <button onClick={() => handleClick("8")} className={`btn__number ${theme === "light" ? "light__btn" : ""}`}>8</button>
                        <button onClick={() => handleClick("9")} className={`btn__number ${theme === "light" ? "light__btn" : ""}`}>9</button>
                        <button onClick={() => handleOperatorClick("*")} className="btn__number blue">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.6018 14.896L0.18575 2.48L1.88175 0.783998L14.2978 13.2L12.6018 14.896ZM1.88175 14.896L0.18575 13.2L12.6018 0.783998L14.2978 2.48L1.88175 14.896Z" fill="white"/>
                            </svg>
                        </button>
                        <button onClick={() => handleClick("4")} className={`btn__number ${theme === "light" ? "light__btn" : ""}`}>4</button>
                        <button onClick={() => handleClick("5")} className={`btn__number ${theme === "light" ? "light__btn" : ""}`}>5</button>
                        <button onClick={() => handleClick("6")} className={`btn__number ${theme === "light" ? "light__btn" : ""}`}>6</button>
                        <button onClick={() => handleOperatorClick("-")} className="btn__number blue">-</button>
                        <button onClick={() => handleClick("1")} className={`btn__number ${theme === "light" ? "light__btn" : ""}`}>1</button>
                        <button onClick={() => handleClick("2")} className={`btn__number ${theme === "light" ? "light__btn" : ""}`}>2</button>
                        <button onClick={() => handleClick("3")} className={`btn__number ${theme === "light" ? "light__btn" : ""}`}>3</button>
                        <button onClick={() => handleOperatorClick("+")} className="btn__number blue">+</button>
                        <button onClick={() => handleClick(".")} className={`btn__number ${theme === "light" ? "light__btn" : ""}`}>.</button>
                        <button onClick={() => handleClick("0")} className={`btn__number ${theme === "light" ? "light__btn" : ""}`}>0</button>
                        <button onClick={() => deleteLastChart()} className={`btn__number ${theme === "light" ? "light__btn" : ""}`}>
                            <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0858 7H11.5H27.5H28.5V8V24V25H27.5H11.5H11.0858L10.7929 24.7071L2.79286 16.7071L2.08575 16L2.79286 15.2929L10.7929 7.29289L11.0858 7ZM11.9142 9L4.91418 16L11.9142 23H26.5V9H11.9142ZM15.5 11.5858L16.2071 12.2929L18.5 14.5858L20.7929 12.2929L21.5 11.5858L22.9142 13L22.2071 13.7071L19.9142 16L22.2071 18.2929L22.9142 19L21.5 20.4142L20.7929 19.7071L18.5 17.4142L16.2071 19.7071L15.5 20.4142L14.0858 19L14.7929 18.2929L17.0858 16L14.7929 13.7071L14.0858 13L15.5 11.5858Z" fill={`${theme === "light" ? "#000" : "white"}`}/>
                            </svg>
                        </button>
                        <button onClick={() => handleCalculate()} className="btn__number blue">=</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Calculator;