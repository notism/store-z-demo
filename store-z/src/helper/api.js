import axios from 'axios';
import { getTokenInfo } from './authenUser';
// import { resources, loadLocalization } from './configLocalization.js';
import { handleEnqueueSnackbar } from './configSnackbar';

const ENDPOINT = [
  'https://nodejs-user-api-demo.herokuapp.com/user/api/',
  'https://nodejs-prod-api-demo.herokuapp.com/prod/api/',
];

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

export const GET00 = (endpointIndex = 0, route = ``, filter = {}, enqueueSnackbar) => {
  const accessToken = getTokenInfo() || {};
  return new Promise((resolve, reject) => {
    const url = `${ENDPOINT[endpointIndex]}/${route}?filter=${JSON.stringify(filter)}`;
    axios
      .get(url)
      .then(
        res => {
          resolve(res);
        },
        err => {
          reject(handleFetchError(err, enqueueSnackbar));
        },
      )
      .catch(err => {
        reject(err);
      });
  });
};

export const POST00 = (endpointIndex = 0, route = ``, data = {}, enqueueSnackbar) => {
  const accessToken = getTokenInfo() || {};
  return new Promise((resolve, reject) => {
    const url = `${ENDPOINT[endpointIndex]}/${route}`;
    axios
      .post(url, { ...data })
      .then(
        res => {
          resolve(res);
        },
        err => {
          //console.log(err.response.data,'reject')
          reject(handleFetchError(err, enqueueSnackbar));
        },
      )
      .catch(err => {
        reject(err);
      });
  });
};

export const GET = (endpointIndex = 0, route = ``, filter = {}, enqueueSnackbar) => {
  const accessToken = getTokenInfo() || {};
  return new Promise((resolve, reject) => {
    const url = `${ENDPOINT[endpointIndex]}/${route}?access_token=${
      accessToken.id
    }&filter=${JSON.stringify(filter)}`;
    axios
      .get(url)
      .then(
        res => {
          resolve(res);
        },
        err => {
          reject(handleFetchError(err, enqueueSnackbar));
        },
      )
      .catch(err => {
        reject(err);
      });
  });
};
export const GET1 = (endpointIndex = 0, route = ``, filter = {}, enqueueSnackbar) => {
  const accessToken = getTokenInfo() || {};
  ////console.log('accessToken',accessToken);
  return new Promise((resolve, reject) => {
    const url = `${ENDPOINT[endpointIndex]}/${route}?year=${JSON.stringify(filter)}&access_token=${
      accessToken.id
    }`;
    ////console.log("URL",url);
    axios
      .get(url)
      .then(
        res => {
          resolve(res);
        },
        err => {
          reject(handleFetchError(err, enqueueSnackbar));
        },
      )
      .catch(err => {
        reject(err);
      });
  });
};

export const GET_FIELD = (endpointIndex = 0, route = ``, params, filter = {}, enqueueSnackbar) => {
  const accessToken = getTokenInfo() || {};
  return new Promise((resolve, reject) => {
    let url = `${ENDPOINT[endpointIndex]}/${route}?access_token=${accessToken.id}`;

    for (let [key, value] of params) {
      url += `&${key}=${value}`;
    }

    url += `&filter=${JSON.stringify(filter)}`;

    // const url = `${ENDPOINT[endpointIndex]}/${route}?access_token=${
    //   accessToken.id
    // }&filter=${JSON.stringify(filter)}`;
    axios
      .get(url)
      .then(
        res => {
          resolve(res);
        },
        err => {
          reject(handleFetchError(err, enqueueSnackbar));
        },
      )
      .catch(err => {
        reject(err);
      });
  });
};

export const GET_PARAMS = (
  endpointIndex = 0,
  route = ``,
  params = {},
  filter = {},
  enqueueSnackbar,
) => {
  const accessToken = getTokenInfo() || {};
  return new Promise((resolve, reject) => {
    const url = `${ENDPOINT[endpointIndex]}/${route}?access_token=${
      accessToken.id
    }&filter=${JSON.stringify(filter)}`;
    axios
      .get(url, {
        params: {
          ...params,
        },
      })
      .then(
        res => {
          resolve(res);
        },
        err => {
          reject(handleFetchError(err, enqueueSnackbar));
        },
      )
      .catch(err => {
        reject(err);
      });
  });
};

export const GET_WHERE = (endpointIndex = 0, route = ``, filter = {}, enqueueSnackbar) => {
  const accessToken = getTokenInfo() || {};
  return new Promise((resolve, reject) => {
    const url = `${ENDPOINT[endpointIndex]}/${route}?access_token=${
      accessToken.id
    }&where=${JSON.stringify(filter)}`;
    console.log('2345654w', url);
    axios
      .get(url)
      .then(
        res => {
          resolve(res);
        },
        err => {
          reject(handleFetchError(err, enqueueSnackbar));
        },
      )
      .catch(err => {
        reject(err);
      });
  });
};

export const POST = (endpointIndex = 0, route = ``, data = {}, enqueueSnackbar) => {
  const accessToken = getTokenInfo() || {};
  return new Promise((resolve, reject) => {
    const url = `${ENDPOINT[endpointIndex]}/${route}?access_token=${accessToken.id}`;
    axios
      .post(url, { ...data })
      .then(
        res => {
          resolve(res);
        },
        err => {
          //console.log(err.response.data,'reject')
          reject(handleFetchError(err, enqueueSnackbar));
        },
      )
      .catch(err => {
        reject(err);
      });
  });
};

export const PATCH = (endpointIndex = 0, route = ``, data = {}, enqueueSnackbar) => {
  const accessToken = getTokenInfo() || {};
  return new Promise((resolve, reject) => {
    const url = `${ENDPOINT[endpointIndex]}/${route}?access_token=${accessToken.id}`;
    axios
      .patch(url, { ...data })
      .then(
        res => {
          resolve(res);
        },
        err => {
          reject(handleFetchError(err, enqueueSnackbar));
        },
      )
      .catch(err => {
        reject(err);
      });
  });
};

const handleFetchError = (err, enqueueSnackbar) => {
  try {
    //Handle validation data

    const error = err.response && err.response.data && err.response.data.error;
    if (error) {
      if (enqueueSnackbar !== '') {
        //console.log(err.response.data.error.statusCode,'statusCode')
      
          handleEnqueueSnackbar(enqueueSnackbar, "เกิดข้อผิดพลาด", 'error');
     
     

        // const lang = loadLocalization();
        // if (lang === 'en') {
        //   handleEnqueueSnackbar(enqueueSnackbar, err.response.data.error.message.EN, 'error');
        // } else if (lang === 'th') {
        //   //console.log(err.response.data.error.message.TH,'messgaeTH')
        //   handleEnqueueSnackbar(enqueueSnackbar, err.response.data.error.message.TH, 'error');
        // } else {
        //   handleEnqueueSnackbar(enqueueSnackbar, err.response.data.error.message.CN, 'error');
        // }
      }
      ////console.log(err.response.data.error.message,'mess')
      let statusCode = err.response.data.error.statusCode;
      if (statusCode === 422 || statusCode === 400 || statusCode === 402) {
        return err.response.data.error.message;
      }

      if (error.name === 'ValidationError') {
        for (let index in error.details.messages) {
          //console.log(index,"index")
          switch (index) {
            case 'email':
              let msg_alert = '';
              let error_message = error.details.messages[index][0];
              if (error_message.includes(`can't be blank`)) {
                msg_alert = `${index} can't be blank`;
              } else if (error_message.includes(`is invalid`)) {
                msg_alert = `${index} is invalid`;
              } else if (error_message.includes(`already exists`)) {
                msg_alert = `${index} already exists`;
              }
              handleEnqueueSnackbar(enqueueSnackbar, msg_alert, 'error');
              break;
            case 'username':
              handleEnqueueSnackbar(enqueueSnackbar, "can't be blank", 'error');
              break;
            default:
              //console.log(index);
              break;
          }
        }
      }
      return error;
    }
    // else {
    //   handleEnqueueSnackbar(enqueueSnackbar, resources.msgCantConnectToServer, 'error')

    return err;
    // }
  } catch (e) {
    return 'Internal Error';
  }
};

// export const GET_MULTI = (func) => {
//   axios.all([...func])
//   .then(axios.spread(function (acct, perms) {
//     //console.log(acct)
//     //console.log(perms)
//     // Both requests are now complete
//   }));
// }

// const invalidAccessToken = {
//   "error": {
//     "statusCode": 401,
//     "name": "Error",
//     "message": "Invalid Access Token",
//     "status": 401,
//     "code": "INVALID_TOKEN"
//   }
// }

export const UPLOAD = (endpointIndex = 0, route = ``, data = {}, enqueueSnackbar) => {
  const accessToken = getTokenInfo() || {};
  return new Promise((resolve, reject) => {
    const url = `${ENDPOINT[endpointIndex]}${route}?access_token=${accessToken.id}`;
    const headers = {
      'Content-Type': 'multipart/form-data',
    };
    axios
      .post(url, data, { headers })
      .then(
        res => {
          resolve(res);
        },
        err => {
          reject(handleFetchError(err, enqueueSnackbar));
        },
      )
      .catch(err => {
        reject(err);
      });
  });
};
