import type { NextPage } from 'next'
import Head from 'next/head'

import { Userform } from '../components/userform.component'
import { useCeramicContext } from '../context';
import { useEffect, useState } from 'react';
import { Profile } from '../types';

const ProfilePage: NextPage = () => {
  const clients = useCeramicContext();
  const { ceramic, composeClient } = clients;
  const [profile, setProfile] = useState<Profile | undefined>();
  const getProfile = async () => {
    
    console.log("ceramic.did: ", ceramic.did);
    if (ceramic.did !== undefined) {
      const profile = await composeClient.executeQuery(`
        query {
          viewer {
            id
            basicProfile {
              id
              name
              username
            }
          }
        }
      `);
      localStorage.setItem("viewer", profile?.data?.viewer?.id);

      console.log("Profile in getProfile: ", profile?.data?.viewer?.basicProfile);
      setProfile(profile?.data?.viewer?.basicProfile);
    } else {
      setProfile(undefined);
    }
  };

  useEffect(() => {
      getProfile();
    }
  , []);

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <div className = "content">
        <div>
          {<Userform />}
          
        </div>
      </div>
    </>
  )
}

export default ProfilePage