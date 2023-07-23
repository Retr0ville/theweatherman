/**
 * @jest-environment jsdom
 */

import { IWeather } from "../interfaces/IWeather";
import {
  deHash,
  getDayandTime,
  getFavLocations,
  getImage,
  getNotes,
  getTopCities,
  getUserLocationCoords,
  getWeatherFromCache,
  hasNotes,
  hash,
  importAllIcons,
  isFavourite,
  isTopCity,
  locationPermissionQuery,
  round,
  sortByLocationName,
  updateWeatherCache,
} from "./functions";

const mockDecryptedValue = "decrypted-value";

// jest.mock('crypto-js', () => ({
//   AES: {
//     decrypt: jest.fn(() => ({
//       toString: jest.fn(() => mockDecryptedValue),
//     })),
//     encrypt: jest.fn(() => {}),
//   },
// }));

describe("importAllIcons", () => {
  // requires disabling webpack's require context which affects importAllIcons functionality

  // it('returns an object with icons', () => {
  //   const requireContext = {
  //     keys: () => ['./night/icon1.svg', './day/icon2.svg', './cloud/icon3.svg'],
  //     resolve: (item: string) => item
  //   };

  //   const icons = importAllIcons(requireContext as __WebpackModuleApi.RequireContext);

  //   expect(typeof icons).toBe('object');
  //   expect(Object.keys(icons)).toHaveLength(3);
  //   expect(icons).toHaveProperty('icon1', './night/icon1.svg');
  //   expect(icons).toHaveProperty('icon2', './day/icon2.svg');
  //   expect(icons).toHaveProperty('icon3', './cloud/icon3.svg');
  // });

  // it('removes the directory prefixes from icon keys', () => {
  //   const requireContext = {
  //     keys: () => ['./night/icon1.svg', './day/icon2.svg', './cloud/icon3.svg'],
  //     resolve: (item: string) => item
  //   };

  //   const icons = importAllIcons(requireContext as __WebpackModuleApi.RequireContext);

  //   expect(icons).toHaveProperty('icon1', './night/icon1.svg');
  //   expect(icons).toHaveProperty('icon2', './day/icon2.svg');
  //   expect(icons).toHaveProperty('icon3', './cloud/icon3.svg');
  //   expect(icons).not.toHaveProperty('./night/icon1.svg');
  //   expect(icons).not.toHaveProperty('./day/icon2.svg');
  //   expect(icons).not.toHaveProperty('./cloud/icon3.svg');
  // });

  it("returns an object", () => {
    const requireContext = {
      keys: () => [],
      resolve: (item: string) => item,
    };

    const icons = importAllIcons(
      requireContext as unknown as __WebpackModuleApi.RequireContext
    );

    expect(typeof icons).toBe("object");
  });
});

describe("getDayandTime", () => {
  it("returns the current time", () => {
    const { time } = getDayandTime();
    const currentTime = new Date().toLocaleTimeString("en-US", {
      hour12: false,
    });
    expect(time).toBe(currentTime);
  });

  it("returns the hour of the day", () => {
    const { hourOfDay } = getDayandTime();
    const currentHour = new Date().getHours().toString().padStart(2, "0");
    expect(hourOfDay).toBe(currentHour);
  });

  it("returns whether it is day or night", () => {
    const { isDay } = getDayandTime();
    const currentHour = new Date().getHours();
    const isCurrentHourDay = currentHour >= 5 && currentHour <= 16;
    expect(isDay()).toBe(isCurrentHourDay);
  });

  it("returns today's date in the expected format", () => {
    const { todaysDate } = getDayandTime();
    const currentDate = `${new Date().toDateString().split(" ")[0]} ${
      new Date().toDateString().split(" ")[1]
    } ${new Date().toDateString().split(" ")[2]},${
      new Date().toDateString().split(" ")[3]
    }`;
    expect(todaysDate()).toBe(currentDate);
  });

  it("returns today's date in the expected format when weather object is provided", () => {
    const mockWeather = {
      location: {
        localtime: "2023-06-24 09:30:00", // Example value for testing
      },
    };
    const { todaysDate } = getDayandTime();
    const expectedDate = new Date("2023-06-24").toDateString();
    expect(todaysDate(mockWeather as IWeather)).toBe(expectedDate);
  });

  it("returns today's date string in the expected format", () => {
    const { today } = getDayandTime();
    const currentDate = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    expect(today).toBe(currentDate);
  });

  it("returns the current day", () => {
    const { day } = getDayandTime();
    const currentDay = new Date().toLocaleDateString("en-US", {
      weekday: "short",
    });
    expect(day()).toBe(currentDay);
  });

  it("returns the day when weather object is provided", () => {
    const mockWeather = {
      location: {
        localtime: "2023-06-24 09:30:00", // Example value for testing
      },
    };
    const { day } = getDayandTime();
    const expectedDay = new Date("2023-06-24").toLocaleDateString("en-US", {
      weekday: "short",
    });
    expect(day(mockWeather as IWeather)).toBe(expectedDay);
  });
});

describe("hash", () => {
  it("returns the encrypted hash of the input", () => {
    const input = "hello world";
    const encryptedHash = hash(input);

    expect(encryptedHash).not.toBe(input);
    expect(encryptedHash.length).toBeGreaterThan(0);
  });

  it("returns a different encrypted hash for different inputs", () => {
    const input1 = "hello world";
    const input2 = "example input";
    const encryptedHash1 = hash(input1);
    const encryptedHash2 = hash(input2);

    expect(encryptedHash1).not.toBe(encryptedHash2);
  });
});

describe("deHash", () => {
  it("returns an empty string if the input is falsy", () => {
    const input = "";
    const decryptedValue = deHash(input);
    expect(decryptedValue).toBe("");
  });

  it("returns the decrypted value of the input", () => {
    const encryptedValue = "encrypted-value";
    const encryptedHash = hash(encryptedValue);
    const decryptedValue = deHash(encryptedHash);
    expect(decryptedValue).toBe(encryptedValue);
  });
});

describe("round", () => {
  it("rounds the number to the specified precision", () => {
    expect(round(3.14159, 2)).toBe("3.14");
    expect(round(3.14159, 3)).toBe("3.142");
    expect(round(3.14159, 0)).toBe("3");
  });

  it("rounds the number to 2 decimal places by default", () => {
    expect(round(3.14159)).toBe("3.14");
    expect(round(2.71828)).toBe("2.72");
    expect(round(1.23456789)).toBe("1.23");
  });

  it("handles negative numbers correctly", () => {
    expect(round(-3.14159, 2)).toBe("-3.14");
    expect(round(-2.71828, 3)).toBe("-2.718");
    expect(round(-1.23456789, 0)).toBe("-1");
  });

  it("returns a string representation of the rounded number", () => {
    const result = round(3.14159, 2);
    expect(typeof result).toBe("string");
  });

  it("returns NaN when the input is NaN", () => {
    expect(round(NaN)).toBe("NaN");
  });

  it("returns Infinity when the input is Infinity", () => {
    expect(round(Infinity)).toBe("Infinity");
  });

  it("returns -Infinity when the input is -Infinity", () => {
    expect(round(-Infinity)).toBe("-Infinity");
  });
});

// Mock the geolocation API
const mockGeolocation = {
  getCurrentPosition: jest.fn(),
};

// Mock the global object based on the environment
// @ts-ignore
const mockGlobal = typeof window !== "undefined" ? window : global;
mockGlobal.navigator.geolocation = mockGeolocation;
mockGlobal.navigator.permissions = { query: { state: "granted" } };

describe("getUserLocationCoords", () => {
  beforeEach(() => {
    // Reset the mock implementation before each test
    mockGeolocation.getCurrentPosition.mockReset();
  });

  it("calls onSuccess with the coordinates when geolocation is supported and successful", () => {
    const onSuccessMock = jest.fn();
    const mockPosition = {
      coords: {
        latitude: 123.46,
        longitude: -987.65,
      },
    };

    mockGeolocation.getCurrentPosition.mockImplementationOnce((success) =>
      success(mockPosition)
    );

    const result = getUserLocationCoords(onSuccessMock);

    expect(mockGeolocation.getCurrentPosition).toHaveBeenCalledTimes(1);
    expect(onSuccessMock).toHaveBeenCalledWith(mockPosition.coords);
    expect(result.failed).toBe(false);
  });

  it("calls onError when geolocation is supported but there is an error", () => {
    const onErrorMock = jest.fn();
    const mockError = new Error("Geolocation error");

    mockGeolocation.getCurrentPosition.mockImplementationOnce((_, error) =>
      error(mockError)
    );

    const result = getUserLocationCoords(jest.fn(), onErrorMock);

    expect(mockGeolocation.getCurrentPosition).toHaveBeenCalledTimes(1);
    expect(onErrorMock).toHaveBeenCalledWith(mockError);
    expect(result.failed).toBe(true);
  });

  it("returns success status when geolocation is not supported", () => {
    delete mockGlobal.navigator.geolocation;

    const result = getUserLocationCoords(jest.fn());

    expect(result.failed).toBe(false);
  });
});

describe("locationPermissionQuery", () => {
  it("returns a Promise that resolves to the permission status", async () => {
    // Mock the PermissionStatus object
    const mockPermissionStatus = { state: "granted" };

    // Mock the navigator.permissions.query method
    const mockQuery = jest.fn(() => Promise.resolve(mockPermissionStatus));
    mockGlobal.navigator.permissions.query = mockQuery;

    const result = await locationPermissionQuery();

    expect(mockQuery).toHaveBeenCalledWith({ name: "geolocation" });
    expect(result).toBe(mockPermissionStatus);
  });

  it("handles error when permission query fails", async () => {
    // Mock the error object
    const mockError = new Error("Permission query failed");

    // Mock the navigator.permissions.query method
    const mockQuery = jest.fn(() => Promise.reject(mockError));
    mockGlobal.navigator.permissions.query = mockQuery;

    await expect(locationPermissionQuery()).rejects.toThrowError(mockError);
    expect(mockQuery).toHaveBeenCalledWith({ name: "geolocation" });
  });
});

// Mock localStorage
const mockLocalStorage = (function () {
  let store: Record<any, any> = {};

  return {
    getItem: function (key: any) {
      return store[key] || null;
    },
    setItem: function (key: any, value: any) {
      store[key] = value.toString();
    },
    removeItem: function (key: any) {
      delete store[key];
    },
    clear: function () {
      store = {};
    },
  };
})();

describe("updateWeatherCache", () => {
  beforeAll(() => {
    Object.defineProperty(window, "localStorage", {
      value: mockLocalStorage,
    });
  });
  beforeEach(() => {
    // Reset mock localStorage functions before each test
    mockLocalStorage.clear();
  });

  it("updates the weather cache with the provided weather data", () => {
    const location = "123.45,-987.65";
    const weather = { location: { lat: 123.45, lon: -987.65 }, data: {} };

    const updatedCache = updateWeatherCache(
      weather as unknown as IWeather,
      location
    );

    expect(updatedCache).toEqual([weather]);
  });
});

describe("getWeatherFromCache", () => {
  beforeAll(() => {
    Object.defineProperty(window, "localStorage", {
      value: mockLocalStorage,
    });
  });
  beforeEach(() => {
    // Reset mock localStorage functions before each test
    mockLocalStorage.clear();
  });

  it("returns the cached weather data for the provided location", () => {
    const location = "123.45,-987.65";
    const weather = {
      location: { lat: 123.45, lon: -987.65 },
      data: {},
    };

    updateWeatherCache(weather as unknown as IWeather, location);

    const result = getWeatherFromCache(location);

    expect(result).toEqual(weather);
  });

  it("returns undefined when no weather data is found for the provided location", () => {
    const location = "123.45,-987.65";

    const result = getWeatherFromCache(location);

    expect(result).toBeUndefined();
  });

  it("returns undefined when an error occurs while accessing the cache", () => {
    const location = "123.456,-987.654";

    // Mock localStorage getItem to throw an error
    jest.spyOn(mockLocalStorage, "getItem").mockImplementationOnce(() => {
      throw new Error("Mock error");
    });

    const result = getWeatherFromCache(location);

    expect(result).toBeUndefined();
  });
});

describe("getFavLocations", () => {
  beforeAll(() => {
    Object.defineProperty(window, "localStorage", {
      value: mockLocalStorage,
    });
  });
  beforeEach(() => {
    mockLocalStorage.clear();
  });

  it("returns the favorite locations from the cache", () => {
    const favoriteLocations = ["London", "NewYork", "Paris"];

    // Mock localStorage getItem
    jest
      .spyOn(localStorage, "getItem")
      .mockReturnValueOnce(hash(JSON.stringify(favoriteLocations)));

    const result = getFavLocations();

    expect(result).toEqual(favoriteLocations);
  });

  it("returns falsy when no favorite locations are found in the cache", () => {
    jest.spyOn(localStorage, "getItem").mockReturnValueOnce("");

    const result = getFavLocations();

    expect(result).toBeFalsy();
  });
});

describe("getTopCities", () => {
  beforeAll(() => {
    Object.defineProperty(window, "localStorage", {
      value: mockLocalStorage,
    });
  });
  beforeEach(() => {
    mockLocalStorage.clear();
  });

  it("returns the top cities data from the cache", () => {
    const location1 = "123.45,-987.65";
    const location2 = "142.45,-999.65";

    const mockTopCities = [
      { name: "London", coord: location1 },
      { name: "Paris", coord: location2 },
    ];

    jest
      .spyOn(localStorage, "getItem")
      .mockReturnValueOnce(hash(JSON.stringify(mockTopCities)));

    const result = getTopCities();

    expect(result).toEqual(mockTopCities);
  });

  it("returns falsy when no top cities are found in the cache", () => {
    jest.spyOn(localStorage, "getItem").mockReturnValueOnce("");

    const result = getFavLocations();

    expect(result).toBeFalsy();
  });
});

describe("getNotes", () => {
  beforeAll(() => {
    Object.defineProperty(window, "localStorage", {
      value: mockLocalStorage,
    });
  });
  beforeEach(() => {
    mockLocalStorage.clear();
  });

  it("returns the notes data from the cache", () => {
    const location1 = "123.45,-987.65";
    const location2 = "142.45,-999.65";

    const mockNotes = [
      { note: "note 1", location: location1 },
      { note: "note 2", location: location2 },
    ];

    jest
      .spyOn(localStorage, "getItem")
      .mockReturnValueOnce(hash(JSON.stringify(mockNotes)));

    const result = getNotes();

    expect(result).toEqual(mockNotes);
  });

  it("returns falsy when no notes are found in the cache", () => {
    jest.spyOn(localStorage, "getItem").mockReturnValueOnce("");

    const result = getFavLocations();

    expect(result).toBeFalsy();
  });
});

describe("isFavourite", () => {
  beforeAll(() => {
    Object.defineProperty(window, "localStorage", {
      value: mockLocalStorage,
    });
  });
  beforeEach(() => {
    mockLocalStorage.clear();
  });

  it("returns data when the item is a favorite", () => {
    const item = {
      location: { lat: 123.45, lon: -987.65 },
      data: {},
    };
    const favoriteLocations = ["123.45,-987.65", "111.22,-333.44"];

    // Mock getFavLocations
    jest.spyOn(localStorage, "getItem").mockReturnValueOnce(hash(JSON.stringify(favoriteLocations)));

    const result = isFavourite(item as unknown as IWeather);

    expect(result).toBeTruthy();
  });

  it("returns false when the item is not a favorite", () => {
    const item = {
      location: { lat: 123.45, lon: -987.65 },
      data: {},
    };
    const favoriteLocations = ["111.22,-333.44", "555.66,-999.00"];

    jest.spyOn(localStorage, "getItem").mockReturnValueOnce(hash(JSON.stringify(favoriteLocations)));

    const result = isFavourite(item as unknown as IWeather);

    expect(result).toBeFalsy();
  });

  it("returns false when there are no favorite locations", () => {
    const item = {
      location: { lat: 123.45, lon: -987.65 },
      data: {},
    };

    jest.spyOn(localStorage, "getItem").mockReturnValueOnce(hash(JSON.stringify("")));

    const result = isFavourite(item as unknown as IWeather);

    expect(result).toBeFalsy();
  });
});

describe("isTopCity", () => {
  beforeAll(() => {
    Object.defineProperty(window, "localStorage", {
      value: mockLocalStorage,
    });
  });
  beforeEach(() => {
    mockLocalStorage.clear();
  });

  it("returns top cities data when the item is a top city", () => {
    const item = {
      location: { lat: 123.45, lon: -987.65 },
      data: {},
    };

    const location1 = "123.45,-987.65";
    const location2 = "142.45,-999.65";

    const mockTopCities = [
      { name: "London", coord: location1 },
      { name: "Paris", coord: location2 },
    ];

    jest.spyOn(localStorage, "getItem").mockReturnValueOnce(hash(JSON.stringify(mockTopCities)));

    const result = isTopCity(item as unknown as IWeather);

    expect(result).toBeTruthy();
  });

  it("returns false when the item is not a top city", () => {
    const item = {
      location: { lat: 183.45, lon: -97.65 },
      data: {},
    };

    const location1 = "123.45,-987.65";
    const location2 = "142.45,-999.65";

    const mockTopCities = [
      { name: "London", coord: location1 },
      { name: "Paris", coord: location2 },
    ];

    jest.spyOn(localStorage, "getItem").mockReturnValueOnce(hash(JSON.stringify(mockTopCities)));

    const result = isTopCity(item as unknown as IWeather);

    expect(result).toBeFalsy();
  });

  it("returns false when there are no top cities", () => {
    const item = {
      location: { lat: 123.45, lon: -987.65 },
      data: {},
    };

    jest.spyOn(localStorage, "getItem").mockReturnValueOnce(hash(JSON.stringify("")));

    const result = isTopCity(item as unknown as IWeather);

    expect(result).toBeFalsy();
  });
});

describe("hasNotes", () => {
  beforeAll(() => {
    Object.defineProperty(window, "localStorage", {
      value: mockLocalStorage,
    });
  });
  beforeEach(() => {
    mockLocalStorage.clear();
  });

  it("returns notes data when the item has notes", () => {
    const item = {
      location: { lat: 123.45, lon: -987.65 },
      data: {},
    };

    const location1 = "123.45,-987.65";
    const location2 = "142.45,-999.65";

    const mockNotes = [
      { note: "note 1", location: location1 },
      { note: "...", location: location2 },
    ];

    jest.spyOn(localStorage, "getItem").mockReturnValueOnce(hash(JSON.stringify(mockNotes)));

    const result = hasNotes(item as unknown as IWeather);

    expect(result).toBeTruthy();
  });

  it("returns false when there is no notes", () => {
    const item = {
      location: { lat: 183.45, lon: -97.65 },
      data: {},
    };

    const location1 = "123.45,-987.65";
    const location2 = "142.45,-999.65";

    const mockNotes = [
      { note: "note 1", location: location1 },
      { note: "...", location: location2 },
    ];

    jest.spyOn(localStorage, "getItem").mockReturnValueOnce(hash(JSON.stringify(mockNotes)));

    const result = hasNotes(item as unknown as IWeather);

    expect(result).toBeFalsy();
  });

  it("returns false when there are no notes", () => {
    const item = {
      location: { lat: 123.45, lon: -987.65 },
      data: {},
    };

    jest.spyOn(localStorage, "getItem").mockReturnValueOnce(hash(JSON.stringify("")));

    const result = hasNotes(item as unknown as IWeather);

    expect(result).toBeFalsy();
  });
});


describe('sortByLocationName', () => {
  it('sorts the weather array in ascending order based on location names', () => {
    const weather = [
      { location: { name: 'C' }, data: {} },
      { location: { name: 'A' }, data: {} },
      { location: { name: 'B' }, data: {} },
    ];

    const sortedWeather = sortByLocationName(weather as unknown as IWeather[]);

    expect(sortedWeather).toEqual([
      { location: { name: 'A' }, data: {} },
      { location: { name: 'B' }, data: {} },
      { location: { name: 'C' }, data: {} },
    ]);
  });

  it('returns the same array when the weather array is already sorted by location names', () => {
    const weather = [
      { location: { name: 'A' }, data: {} },
      { location: { name: 'B' }, data: {} },
      { location: { name: 'C' }, data: {} },
    ];

    const sortedWeather = sortByLocationName(weather as unknown as IWeather[]);

    expect(sortedWeather).toEqual(weather as unknown as IWeather[]);
  });

  it('returns an empty array when the weather array is empty', () => {
    const weather: IWeather[] = [];

    const sortedWeather = sortByLocationName(weather);

    expect(sortedWeather).toEqual([]);
  });
});

describe('getImage', () => {
  it('returns the image object for the provided condition code', () => {
    const conditionCode = 1000;
    const toBeReturned =   {
      code: 1000,
    }

    const result = getImage(conditionCode);

    expect(result?.code).toEqual(toBeReturned.code);
  });

  it('returns undefined when the condition code is not found', () => {
    const conditionCode = 500;

    const result = getImage(conditionCode);

    expect(result).toBeUndefined();
  });
});

