import { Dispatch, SetStateAction, ChangeEvent } from 'react';

// Types
import * as dataTypes from '@/types/data';

const handleInputChange = (stateSetter: Dispatch<SetStateAction<string>>, e: ChangeEvent<HTMLInputElement>): void => {
	stateSetter(e.target.value);
};

const handleButtonClick = (stateSetter: Dispatch<SetStateAction<dataTypes.User[]>>, filteredData: dataTypes.User[]): void => {
	stateSetter(filteredData);
};

const listRequiredCategories = (key: string, stringArray: string[]): any => {
	if (stringArray.includes(key)) {
		return key;
	}
};

export { handleInputChange, handleButtonClick, listRequiredCategories };
