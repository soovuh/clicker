import { useEffect } from 'react';
import { useQuery } from '../../../../hooks/useQuery';
import { createUserGitHub } from '../../../../functions/httpRequests';
import Loading from '../../../UI/Loading';

const GitHubAuth = () => {
  const query = useQuery();
  const state = query.get('state');
  const code = query.get('code');

  const createuser = async (state, code) => {
    const response = await createUserGitHub(state, code);
    console.log('response', response);
  };

  useEffect(() => {
    if (!query) return;

    createuser(state, code);

    console.log('state', query.get('state'));
    console.log('code', query.get('code'));
  }, [code, state, query]);

  return <Loading type="bars" />;
};

export default GitHubAuth;
