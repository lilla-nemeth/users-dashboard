import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import {
	capitalizeString,
	handleButtonClick,
	handleCardSorting,
	handleDefaultName,
	handleDisplay,
	handleText,
	handleUserData,
	listRequiredCategories,
	sortUserCards,
	fetchUsers,
	handleClickOutside,
} from '../utils/functions';
import { User } from '@/types/data';
import { mockApiUsers, mockFilteredUsers } from '../__mocks__/testUsers';

test('capitalizeString', () => {
	expect(capitalizeString('test string')).toBe('Test string');
});

describe('handleText', () => {
	it('should update state with input value', () => {
		const setStateMock = jest.fn();
		const mockEvent = {
			target: {
				value: 'new input value',
			},
		} as ChangeEvent<HTMLInputElement>;

		handleText(setStateMock, mockEvent);
		expect(setStateMock).toHaveBeenCalledWith('new input value');
	});
});

describe('handleUserData', () => {
	it('should call stateSetter with apiData when searchStr is not empty', () => {
		const setStateMock: Dispatch<SetStateAction<User[]>> = jest.fn();

		handleUserData('search', setStateMock, mockFilteredUsers, mockApiUsers);
		expect(setStateMock).toHaveBeenCalledWith(mockFilteredUsers);
	});

	it('should call stateSetter with apiData when searchStr is empty', () => {
		const setStateMock: Dispatch<SetStateAction<User[]>> = jest.fn();

		handleUserData('', setStateMock, mockFilteredUsers, mockApiUsers);
		expect(setStateMock).toHaveBeenCalledWith(mockApiUsers);
	});
});

describe('handleButtonClick', () => {
	it('should call stateSetter with filteredData when button is clicked', () => {
		const setStateMock: Dispatch<SetStateAction<User[]>> = jest.fn();
		const mockFilteredData = mockApiUsers.slice(0, 2);

		handleButtonClick(setStateMock, mockFilteredData);
		expect(setStateMock).toHaveBeenCalledWith(mockFilteredData);
	});
});

describe('handleDisplay', () => {
	it('should toggle the isOpen state from false to true', () => {
		const setStateMock: Dispatch<SetStateAction<boolean>> = jest.fn();
		const initialOpenState = false;

		handleDisplay(initialOpenState, setStateMock);
		expect(setStateMock).toHaveBeenCalledWith(true);
	});

	it('should toggle the isOpen state from true to false', () => {
		const setStateMock: Dispatch<SetStateAction<boolean>> = jest.fn();
		const initialOpenState = true;

		handleDisplay(initialOpenState, setStateMock);
		expect(setStateMock).toHaveBeenCalledWith(false);
	});
});

describe('handleDefaultName', () => {
	it('should call stateSetter when isOpen false and category name does not match with the string', () => {
		const setStateMock: Dispatch<SetStateAction<string>> = jest.fn();
		const isOpen = false;
		const categoryName = 'Name';
		const str = 'Sort by';

		handleDefaultName(isOpen, categoryName, str, setStateMock);
		expect(setStateMock).toHaveBeenCalledWith(str);
	});

	it('should not call stateSetter when isOpen is true (string matching is irrelevant here)', () => {
		const setStateMock: Dispatch<SetStateAction<string>> = jest.fn();
		const isOpen = true;
		const categoryName = 'Email';
		const str = 'Sort By';

		handleDefaultName(isOpen, categoryName, str, setStateMock);
		expect(setStateMock).not.toHaveBeenCalled();
	});

	it('should not call stateSetter when isOpen false and categoryName matches with the string', () => {
		const setStateMock: Dispatch<SetStateAction<string>> = jest.fn();
		const isOpen = false;
		const categoryName = 'Email';
		const str = 'Email';

		handleDefaultName(isOpen, categoryName, str, setStateMock);
		expect(setStateMock).not.toHaveBeenCalled();
	});
});

describe('listRequiredCategories', () => {
	it('should return the capitalized format of object key when it matches with an element from the stringArray', () => {
		const key = 'name';
		const stringArray = ['name', 'email'];
		const callback = jest.fn((str) => capitalizeString(str));

		const result = listRequiredCategories(key, stringArray, callback);
		expect(result).toBe('Name');
		expect(callback).toHaveBeenCalledWith(key);
	});

	it('should return an empty string when the object key cannot be found in the stringArray', () => {
		const key = 'hobby';
		const stringArray = ['name', 'email'];
		const callback = jest.fn();

		const result = listRequiredCategories(key, stringArray, callback);
		expect(result).toBe('');
		expect(callback).not.toHaveBeenCalled();
	});
});

describe('sortUserCards', () => {
	it('should sort users by name in ascending order', () => {
		const sortedUsers = sortUserCards(mockApiUsers, 'Name', true);
		expect(sortedUsers[0].name).toBe('Jane Doe');
		expect(sortedUsers[1].name).toBe('John Doe');
	});

	it('should sort users by name in descending order', () => {
		const sortedUsers = sortUserCards(mockApiUsers, 'Name', false);
		expect(sortedUsers[0].name).toBe('John Doe');
		expect(sortedUsers[1].name).toBe('Jane Doe');
	});

	it('should sort users by email in ascending order', () => {
		const sortedUsers = sortUserCards(mockApiUsers, 'Email', true);
		expect(sortedUsers[0].email).toBe('janedoe@megacorp.com');
		expect(sortedUsers[1].email).toBe('johndoe@solutioncorp.com');
	});

	it('should sort users by email in descending order', () => {
		const sortedUsers = sortUserCards(mockApiUsers, 'Email', false);
		expect(sortedUsers[0].email).toBe('johndoe@solutioncorp.com');
		expect(sortedUsers[1].email).toBe('janedoe@megacorp.com');
	});
});

describe('handleCardSorting', () => {
	it('should call stateSetter with sorting function (which has category and order check)', () => {
		const setStateMock = jest.fn() as jest.Mock<Dispatch<SetStateAction<User[]>>>;
		const category = 'Name';
		const isAscending = true;

		handleCardSorting(sortUserCards, mockApiUsers, category, isAscending, setStateMock);
		expect(setStateMock).toHaveBeenCalled();

		const sortedUsers = setStateMock.mock.calls[0][0];
		expect(sortedUsers[0].name).toBe('Jane Doe');
	});
});

describe('fetchUsers', () => {
	let setUserApiData: jest.Mock;
	let setFilteredUserData: jest.Mock;
	let setError: jest.Mock;
	const userApiData: User[] = [];

	beforeEach(() => {
		setUserApiData = jest.fn();
		setFilteredUserData = jest.fn();
		setError = jest.fn();
	});

	afterEach(() => {
		jest.clearAllMocks();
		jest.restoreAllMocks();
	});

	it('should fetch users and set userApiData and filteredUserData', async () => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				ok: true,
				json: () => Promise.resolve(mockApiUsers),
			})
		) as jest.Mock;

		await fetchUsers(setUserApiData, userApiData, setFilteredUserData, setError);

		expect(setUserApiData).toHaveBeenCalledWith(mockApiUsers);
		expect(setFilteredUserData).toHaveBeenCalledWith(userApiData);
		expect(setError).not.toHaveBeenCalled();
	});

	it('should handle error when fetch user data failed', async () => {
		const errorMessage = 'Failed to fetch user data';

		global.fetch = jest.fn(() =>
			Promise.resolve({
				ok: false,
				json: () => Promise.resolve({ error: errorMessage }),
			})
		) as jest.Mock;

		await fetchUsers(setUserApiData, userApiData, setFilteredUserData, setError);

		expect(setError).toHaveBeenCalledWith(errorMessage);
		expect(setUserApiData).not.toHaveBeenCalled();
		expect(setFilteredUserData).not.toHaveBeenCalled();
	});
});

describe('handleClickOutside', () => {
	it('should call setIsOpen with false when click is outside the dropdown', () => {
		const setIsOpenMock = jest.fn();
		const dropdownRef = { current: document.createElement('div') };

		const event = new MouseEvent('mousedown', { bubbles: true });
		document.body.dispatchEvent(event);

		handleClickOutside(event, dropdownRef, setIsOpenMock);
		expect(setIsOpenMock).toHaveBeenCalledWith(false);
	});

	it('should not call setIsOpen when click is inside the dropdown', () => {
		const setIsOpenMock = jest.fn();
		const dropdownRef = { current: document.createElement('div') };
		dropdownRef.current.appendChild(document.createElement('div'));

		const event = new MouseEvent('mousedown', { bubbles: true });
		dropdownRef.current.dispatchEvent(event);

		handleClickOutside(event, dropdownRef, setIsOpenMock);
		expect(setIsOpenMock).not.toHaveBeenCalled();
	});
});
