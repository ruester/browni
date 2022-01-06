import { Controller } from "./Controller";
import { Model } from "./Model/Model";
import Reader from "./Reader/Reader";

let Nami = function(data, output, lifeCycle) {
  let model, controller;
  let dataWasParsed = () =>{};
  if(lifeCycle && lifeCycle.dataWasParsed) dataWasParsed = lifeCycle.dataWasParsed;

  let dataWasLoaded = (model) =>{};
  if(lifeCycle && lifeCycle.dataWasLoaded) dataWasLoaded = lifeCycle.dataWasLoaded;

  let init = newData => {
    dataWasParsed(newData);

    model = new Model(newData);

    dataWasLoaded(model);

    controller = new Controller(model, newData, lifeCycle);

    controller.animate();
  };

  const newData = new Reader(data, output);
  Promise.all([newData.bathymetry.array, newData.initialCondition, newData.slab]).then(
    values => {
      const [bathyArray, earthquake, slab] = values;

      newData.bathymetry.array = bathyArray;

      newData.earthquake = earthquake;

      newData.slab = slab;
      
      init(newData);
    }
  );
};

export default Nami;
