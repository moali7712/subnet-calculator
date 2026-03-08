function calculateSubnet() {
    let ipInput = document.getElementById("ip").value;
    let cidr = parseInt(document.getElementById("cidr").value);

    let ip = ipInput.split(".").map(Number);

    if(ip.length !== 4 || ip.some(octet => isNaN(octet) || octet < 0 || octet > 255)) {
        alert("Please enter a valid IP address");
        return;
    }

    if(isNaN(cidr) || cidr < 0 || cidr > 32) {
        alert("Please enter a valid CIDR (0-32)");
        return;
    }

    // حساب Subnet Mask
    let mask = [];
    let remaining = cidr;
    for(let i=0; i<4; i++) {
        if(remaining >= 8) {
            mask.push(255);
            remaining -= 8;
        } else if(remaining > 0) {
            mask.push(256 - Math.pow(2, 8-remaining));
            remaining = 0;
        } else {
            mask.push(0);
        }
    }

    // حساب Network Address
    let network = [];
    for(let i=0; i<4; i++) {
        network.push(ip[i] & mask[i]);
    }

    // حساب Broadcast Address
    let broadcast = [];
    for(let i=0; i<4; i++) {
        broadcast.push(network[i] | (255 - mask[i]));
    }

    document.getElementById("result").innerHTML = `
        <p><b>Subnet Mask:</b> ${mask.join(".")}</p>
        <p><b>Network Address:</b> ${network.join(".")}</p>
        <p><b>Broadcast Address:</b> ${broadcast.join(".")}</p>
    `;
}