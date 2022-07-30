export const authentication = async (context: any, permission?: string) => {
    const token = context.req.cookies[process.env.authToken as string];
    
    const response = await fetch(process.env.apiURL + '/verifyUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        token: token ? token : '',
        permission: permission ? permission : '',
      }),
    });
  
    var result = await response.json();
    return result;
  };