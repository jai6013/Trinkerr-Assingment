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

  const [button, setButtonShow] = useState([]);

  const handlePercentage = (price1, price2) => {
    return (((price1 - price2) / price2) * 100).toFixed(2);
  };

  const color = (item) => {
    return handlePercentage(item[1], item[2]) < 0 ? true : false;
  };

  const handleSearch = (q) => {
    if (q === "") {
      setNewData(listData.current);
    } else {
      if (q.length <= 1) {
        return;
      }
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
  const check = (item) => {
    if (listData.current.some((i) => i[0] === item[0])) {
      return true;
    }
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
    if (listData.current.some((i) => i[0] === item[0])) {
      return;
    }
    listData.current = [item, ...listData.current];
    alert(`${item[0].split("::")[0]} is added to watchlist`);
  };

  const handleDelete = (val) => {
    let data = newData.filter((item) => item[0] !== val[0]);
    listData.current = listData.current.filter((item) => item[0] !== val[0]);
    setNewData(data);
  };

  const handleSeeButton = (index, val) => {
    let buttonShow = new Array(newData.length).fill({
      show: false,
      icon: true,
    });
    console.log(buttonShow, "0");
    buttonShow = buttonShow.map((item, i) => {
      if (i === index) {
        if (check(val)) {
          return { ...item, show: true, icon: false };
        } else {
          return { ...item, show: true, icon: true };
        }
      } else {
        return { ...item, show: false, icon: true };
      }
    });
    console.log(buttonShow, "1");
    setButtonShow(buttonShow);
  };

  const handleNotSeeButton = () => {
    let buttonShow = new Array(newData.length).fill({ show: false });
    setButtonShow(buttonShow);
  };

  return (
    <>
      <h1 className={styles.nav}>Trinkerr <div className={styles.watchlist} onClick={() => {setQuery(""); setNewData(listData.current)}}>Watchlist</div></h1>
      <div id={styles.root}>
        <div>
          <input
            type="text"
            placeholder="Search Stocks..."
            onChange={(e) => handleSearch(e.target.value.toUpperCase())}
            className={styles.searchStock}
          />
        </div>
        <br />
        <div
          className={styles.heading}
          style={{ display: query === "" ? "block" : "none" }}
        >
          <div className={styles.heading}>Watchlist</div>
        </div>

        {newData.length === 0 ? (
          <div>
            <img
              style={{ objectFit: "cover", height: "500px" }}
              src="https://i.pinimg.com/736x/55/58/d3/5558d33b676596fa5cda52be372037f8.jpg"
              alt="no"
            />
          </div>
        ) : null}

        <div className={styles.partsBody}>
          {newData &&
            newData.map((item, index) => (
              <div
                key={index}
                onMouseEnter={() => handleSeeButton(index, item)}
                onMouseLeave={() => handleNotSeeButton()}
                style={{
                  color: color(item) ? "rgb(231,89,46)" : "#95bef0",
                }}
                className={styles.part}
              >
                <div className={styles.part1}>
                  <div>{item[0].split("::")[0]}</div>
                  <div className={styles.stockType}>
                    {item[0].split("::")[1]}
                  </div>
                </div>

                <div className={styles.hiddenButtons}>
                  {button[index] &&
                  button[index].show === true &&
                  button[index].icon === true ? (
                    <button onClick={() => handleAdd(item)}>
                      <AddIcon
                        className={styles.bt}
                        style={{ display: button[index] ? "block" : "none" }}
                      />
                    </button>
                  ) : null}
                  {button[index] &&
                  button[index].show === true &&
                  button[index].icon === false ? (
                    <button onClick={() => handleDelete(item)}>
                      <DeleteIcon
                        className={styles.bt}
                        style={{ display: button[index] ? "block" : "none" }}
                      />
                    </button>
                  ) : null}
                </div>
                <div className={styles.part2}>
                  <div>{item[1]}</div>
                  <div className={styles.percent}>
                    <div style={{ marginTop: "3px" }}>
                      {handlePercentage(item[1], item[2]) < 0 ? (
                        <ArrowDropDownIcon />
                      ) : (
                        <ArrowDropUpIcon />
                      )}
                    </div>
                    <div>{handlePercentage(item[1], item[2])}%</div>
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
