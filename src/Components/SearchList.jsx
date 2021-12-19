import React, { useState } from "react";
import data from "../db/data.json";
import styles from "../Styles/watchlist.module.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRef } from "react";

const SearchList = () => {
  const [query, setQuery] = useState("");
  const [newData, setNewData] = useState([]);
  const listData = useRef([]);
  const [showWatchList, setShow] = useState(false);
  const [button, setButtonShow] = useState([]);


  const handlePercentage = (price1, price2) => {
    return (((price1 - price2) / price2) * 100).toFixed(2);
  };

  const color = (item) => {
    return handlePercentage(item[1], item[2]) < 0 ? true : false;
  };

  const handleSearch = (q) => {
    if (q === "") {
      setShow(true);
      setNewData(listData.current);
    } else {
      if (q.length <= 1) {
        return;
      }
      setShow(false);
      var timerId;
      if (!timerId) {
        timerId = setTimeout(() => {
          getData(q);
          clearTimeout(timerId);
        }, 200);
      }
    }
    setQuery(q);
  };
  
  const getData = (q) => {
    const filterData = (item) => {
      if (item[0].split("::")[0].includes(q)) {
        return item;
      }
    };
    const newDatas = data.filter((item) => filterData(item));
    setNewData(newDatas);
  };

  const handleAdd = (item) => {
    listData.current = [item, ...listData.current];
  };
  const handleDelete = (ind) => {
    listData.current = listData.current.filter((item, index) => index !== ind);
    setNewData(listData.current);
  };

  const handleSeeButton = (index) => {
    let buttonShow = new Array(newData.length).fill({ show: false });
    buttonShow = buttonShow.map((item, i) => {
      if (i === index) {
        return (item.show = true);
      } else {
        return (item.show = false);
      }
    });
    setButtonShow(buttonShow);
  };
  const handleNotSeeButton = () => {
    let buttonShow = new Array(newData.length).fill({ show: false });
    setButtonShow(buttonShow);
  };

  return (
    <>
      <h1 className={styles.nav}>Trinkerr</h1>
      <div id={styles.root}>
        <div>
          <input
            type="text"
            placeholder="Search Stocks..."
            onChange={(e) => handleSearch(e.target.value.toUpperCase())}
            className={styles.searchStock}
          />
        </div>
        <br/>
        <div
          className={styles.heading}
          style={{ display: query === "" ? "block" : "none" }}
        >
          <div className={styles.heading}>Watchlist</div>
        </div>
        
        {
          newData.length === 0 ? <div>
            <img style={{objectFit: "cover", height: "500px"}} src="https://i.pinimg.com/736x/55/58/d3/5558d33b676596fa5cda52be372037f8.jpg" alt="no" /> 
          </div> :
          null
        }

        <div className={styles.partsBody}>
          {newData &&
            newData.map((item, index) => (
              <div
                key={index}
                onMouseEnter={() => handleSeeButton(index)}
                onMouseLeave={() => handleNotSeeButton()}
                style={{ color: color(item) ? "rgb(231,89,46)" : "rgb(193,236,235)" }}
                className={styles.part}
              >
                <div className={styles.part1}>
                  <div>{item[0].split("::")[0]}</div>
                  <div className={styles.stockType}>
                    {item[0].split("::")[1]}
                  </div>
                </div>
                {/* {
                    item[3] !== undefined && item[3] === "show" ?
                    <AddIcon/> : null
                  } */}

                  <div className={styles.hiddenButtons}>
                {showWatchList ? (
                  button[index] === true ? (
                    <button onClick={() => handleDelete(index)}>
                      <DeleteIcon
                        className={styles.bt}
                        style={{ display: button[index] ? "block" : "none" }}
                      />
                    </button>
                  ) : null
                ) : button[index] === true ? (
                  <button onClick={() => handleAdd(item)}>
                    <AddIcon
                      className={styles.bt}
                      style={{ display: button[index] ? "block" : "none" }}
                    />
                  </button>
                ) : null}
            </div>
                <div className={styles.part2}>
                  <div>{item[1]}</div>
                  <div className={styles.percent}>
                    <div style={{marginTop: "3px"}}>
                      {handlePercentage(item[1], item[2]) < 0 ? (
                        <ArrowDropDownIcon />
                      ) : (
                        <ArrowDropUpIcon />
                      )}
                    </div>
                    <div>
                    {handlePercentage(item[1], item[2])}%
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export { SearchList };
