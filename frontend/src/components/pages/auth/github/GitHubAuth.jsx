import { useEffect } from 'react';
import { useQuery } from '../../../../hooks/useQuery';
import { createUserGitHub } from '../../../../functions/httpRequests';
import Loading from '../../../UI/Loading';

const GitHubAuth = () => {
  const query = useQuery();
  const state = query.get('state');
  const code = query.get('code');

  const createuser = async (state, code) => {
    try {
      const response = await createUserGitHub(state, code);

      if (!response.ok) {
        alert('Whoops! Something went wrong...');
        const { status, statusText } = response;
        throw new Error(`${status} ${statusText}`);
      }

      // redirect user to home (or login?)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!query) return;

    createuser(state, code);

    // console.log('state', query.get('state'));
    // console.log('code', query.get('code'));
  }, [code, state, query]);

  return <Loading type="bars" />;
};

export default GitHubAuth;
