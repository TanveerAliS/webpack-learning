import inputsAreValid from './utils/inputsAreValid';
import parseInputs from './utils/parseInputs';

export const run = (alertService, componentService) => {
  alertService.hideErrors();
  componentService.onClick(() => {
    alertService.hideErrors();
    const inputs = componentService.getInput();
    const parsedInputs = parseInputs(...inputs);
    if (inputsAreValid(...parsedInputs)) {
      const [numA, numB] = parsedInputs;
      componentService.setResult(numA + numB);
    } else {
      componentService.setResult("");
      handleAdditionError(inputs, parsedInputs);
    }
  });
};

// run(alertService, componentService);
