function getOptions() {
    let options = {};
    if (localStorage.getItem('token')) {
      options.headers = {
        Authorization: 'Token ' + localStorage.getItem('token'),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      };
    } else {
      options.headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      };
    }
  
    return options;
  }
  
  export default getOptions;
  