import billApi from "../api/billApi.js";

const statistical = async (year) => {
    try {
        for (let i = 1; i < 13 ;i++) {
            const chart = document.querySelector(`.month${i}`);
            console.log(chart);
            chart.setAttribute("height",0);
            chart.setAttribute("y", 303 );
        }
        const result = await billApi.getMoney(year);
		console.log(result)
        if (result.length > 0) {
            const totalMoney = document.querySelector(".total-money");
            
            let moneyValue = 0
            

            for (let i = 0; i < result.length; i++) {
                moneyValue = result[i].revenue+moneyValue;
                const chart = document.querySelector(`.month${result[i].month.toString()}`);
                console.log(chart);
                let heightC = result[i].revenue *0.00132
                if (heightC <1 )
                {
                    heightC =1;
                }
                chart.setAttribute("height",heightC);
                chart.setAttribute("y", 303-heightC );
                //show price
                chart.addEventListener("mouseover", ()=> {
                    const itemHover = document.querySelector(".hover-price");
                    const priceH = document.querySelector(".morris-hover-point")
                    priceH.innerText = `$ ${result[i].revenue}`
                    const monthH = document.querySelector(".morris-hover-row-label")
                    monthH.innerText = `Tháng: ${result[i].month}`
                    console.log("on mouse")
                    itemHover.setAttribute("style", `left: 447.9714px; top: -17px; display:block`)

                })
                chart.addEventListener("mouseout", ()=> {
                    console.log("on out")
                    const itemHover = document.querySelector(".hover-price");
                    itemHover.setAttribute("style", `left: 447.9714px; top: -17px; display:none`)

                })

            }
            console.log(moneyValue)
            totalMoney.innerHTML = moneyValue;
            

        }
        else {
            const totalMoney1 = document.querySelector(".total-money");
            totalMoney1.innerHTML = 0;
            console.log(totalMoney1)
            for (let i = 1; i < 13 ;i++) {
                const chart = document.querySelector(`.month${i}`);
                console.log(chart);
                chart.setAttribute("height",0);
                chart.setAttribute("y", 303 );
            }

        }
        

    } catch (e) {
        console.log(e);
    }
};





const getYear = async (year) => {
    try {
        const result = await billApi.getYear(year);
		console.log(result)
        const selectYear = document.querySelector(".selectedY")
        if(result.length>0)
        {
            console.log(selectYear)
            let arrayOption =["<option>Chọn năm</option>"];
            for (let index = 0; index < result.length; index++) {
                arrayOption.push(`<option class="selectedY">${result[index].year }</option>`)
            }
            console.log(arrayOption.join(""))
            selectYear.innerHTML = arrayOption.join("");
        }
        selectYear.addEventListener("change", () => {
            statistical(selectYear.value)
        })
    } catch (e) {
        console.log(e);
    }
};

getYear()