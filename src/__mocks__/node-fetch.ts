import fetch from 'node-fetch';

export const fetchMock = jest.genMockFromModule('node-fetch') as unknown as jest.Mock<typeof fetch>;

const apiResponses = {} as Record<string, string>;

interface UrlResult {
  url: string;
  result: null | string;
}

const singleUrlResults: UrlResult[] = [];

function constructResponse(response: string) {
  return Promise.resolve({
    text: jest.fn().mockResolvedValue(response),
    json: jest.fn().mockImplementation(() => JSON.parse(response)),
    ok: true,
    status: 200,
  });
}

export function setUrlResult(url: string, result: string) {
  singleUrlResults.push({ url, result });
}

export function simulateSingleFetchFailure(url: string | null = null, response: string = '{}') {
  if (url === null) {
    fetchMock.mockImplementationOnce(
      jest.fn().mockResolvedValue({
        ok: false,
        json: jest.fn().mockResolvedValue(JSON.parse(response)),
      }),
    );
  } else {
    singleUrlResults.push({
      url,
      result: null,
    });
  }
}

fetchMock.mockImplementation(
  jest.fn().mockImplementation((url: string, params: { body: string }) => {
    if (url.startsWith('https://anyhow.com/v1')) {
      console.debug({ params });
      return constructResponse('{}');
    }

    const indexResult = singleUrlResults.findIndex(s => url.startsWith(s.url));
    if (indexResult !== -1) {
      const [{ result }] = singleUrlResults.splice(indexResult, 1);
      if (result === null) {
        return Promise.resolve({
          ok: false,
        });
      }
      return constructResponse(result);
    }

    let index = 0;
    const keys = Object.keys(apiResponses);
    for (let i = keys.length; i > 0; i -= 1) {
      const urlStart = keys[index];
      const response = apiResponses[urlStart];

      if (url.startsWith(urlStart)) {
        return constructResponse(response);
      }

      index += 1;
    }
    throw new Error(`url ${url} not in the list of mocked API results`);
  }),
);

export default fetchMock;
