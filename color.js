
const hexInput = document.getElementById("hexInput");
const inputColor = document.getElementById("inputColor");
const slider = document.getElementById("slider");
const sliderText = document.getElementById("sliderText");
const alteredColor = document.getElementById("alteredColor");
const alteredColorText = document.getElementById("alteredColorText");
//lightenText, darkenText, toggleBtn
const lightenText = document.getElementById("lightenText");
const darkenText = document.getElementById("darkenText");
const toggleBtn = document.getElementById("toggleBtn");

//click event listener to the toggle btn
toggleBtn.addEventListener('click', () => {
    if(toggleBtn.classList.contains('toggled')) {
        toggleBtn.classList.remove('toggled');
        darkenText.classList.add('unselected');
        lightenText.classList.remove('unselected');
    } else {
        toggleBtn.classList.add('toggled');
        lightenText.classList.add('unselected');
        darkenText.classList.remove('unselected');
    }
})

hexInput.addEventListener('keyup', () => {
    const hex = hexInput.value;
    if(!isValidHex(hex)) return;

    const strippedHex = hex.replace('#', '');

    inputColor.style.backgroundColor = "#" + strippedHex;
});

const isValidHex = (hex) => {
    if(!hex) return false;

    const strippedHex = hex.replace('#', '');
    return strippedHex.length === 3 || strippedHex.length === 6;
}

const convertHexToRGB = (hex) => {
    if(!isValidHex(hex)) return null;

    let strippedHex = hex.replace('#', '');

    if(strippedHex.length === 3) {
        strippedHex = strippedHex[0] + strippedHex[0]
        + strippedHex[1] + strippedHex[1]
        + strippedHex[2] + strippedHex[2];
    }
    
    const r = parseInt(strippedHex.substring(0,2), 16);
    const g = parseInt(strippedHex.substring(2,4), 16);
    const b = parseInt(strippedHex.substring(4,6), 16);

    return {r, g, b}
}

const converRGBToHex = (r, g, b) => {
    const firstPair = ("0" + r.toString(16)).slice(-2);
    const secondPair = ("0" + g.toString(16)).slice(-2);
    const thirdPair = ("0" + b.toString(16)).slice(-2);

    const hex = "#" + firstPair + secondPair + thirdPair;
    return hex;
}

const alterColor = (hex, percentage) => {
    const {r, g, b} = convertHexToRGB(hex);

    const amount = Math.floor((percentage/100) * 255);

    const newR = increaseWithin0To255(r, amount);
    const newG = increaseWithin0To255(g, amount);
    const newB = increaseWithin0To255(b, amount);
    return converRGBToHex(newR, newG, newB);
}

const increaseWithin0To255 = (hex, amount) => {
    // const newHex = hex + amount;
    // if(newHex > 255) return 255;
    // if(newHex < 0) return 0;
    // return newHex;
    return Math.min(255, Math.max(0, hex + amount));
}

slider.addEventListener('input', () => {

    //check if hex is valid
    if(isValidHex(hexInput.value)) {
        sliderText.textContent = `${slider.value}%`;
        //get the altered hex value
        //update the altered color
        const alteredHex = alterColor(hexInput.value, slider.value);
        alteredColor.style.backgroundColor = alteredHex;
        alteredColorText.innerText = alteredHex;
    }
})
