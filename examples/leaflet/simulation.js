let data = {
    bathymetry: [[1,1,1],[1,1,1],[1,1,1]]
    ,
    earthquake: [{
        L: 5,
        W: 3,
        depth: 2,
        slip: 1.0,
        strike: 30.0,
        dip: 70.0,
        rake: -45.0,
        U3: 1.0,
        cn: 0,
        ce: 0,
        reference: 'center'
    }],
    coordinates: 'cartesian',
    waveWidth: 100,
    waveHeight: 100,
    xmin: -10,
    xmax: 10,
    ymin: -10,
    ymax: 10
}

let output = {
    stopTime: 50,
    displayWidth: 512,
    displayHeight: 512,
};

lifeCycle = {
    dataWasLoaded: (model) => {
        document.body.appendChild(model.canvas);
        model.canvas.style = 'position:absolute;left:-512px;';
        
        video1 = document.getElementById('videoTarget');
        var stream = model.canvas.captureStream();
        video1.srcObject = stream;
    
    }
}

setTimeout(function(){
    let thismodel = Nami(data, output, lifeCycle);
}, 2000);
