public IUserAuthData GetCurrent(string email, string password)
        {
            string procName = "[dbo].[Users_Select_AuthDataV3]";
            UserBase user = null;
            AuthUser authUser = null;
            List<AuthOrganization> orgsWithRoles = null;
            List<Trainee> trainees = null;

            _dataProvider.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Email", email);
            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {

                int i = 0;

                authUser = new AuthUser();
                user = new UserBase();

                authUser.Id = reader.GetSafeInt32(i++);
                authUser.Email = reader.GetSafeString(i++);
                authUser.Password = reader.GetSafeString(i++);

                string orgsAsString = reader.GetSafeString(i++);

                if (!string.IsNullOrEmpty(orgsAsString))
                {
                    orgsWithRoles = JsonConvert.DeserializeObject<List<AuthOrganization>>(orgsAsString);
                }

                trainees = reader.DeserializeObject<List<Trainee>>(i++);

                authUser.Organizations = GetOrganizations(orgsWithRoles);
                authUser.CurrentOrg = authUser.Organizations[0];
                authUser.Roles = GetRoles(orgsWithRoles);
                authUser.Trainees = GetTrainees(trainees);
                authUser.CurrentTrainee = authUser.Trainees[0];

            }
            );
            bool isValidCredentials = BCrypt.BCryptHelper.CheckPassword(password, authUser.Password);

            if (isValidCredentials)
            {
                user.Id = authUser.Id;
                user.Name = authUser.Email;
                user.TenantId = "Immersed";
                user.Organizations = authUser.Organizations;
                user.CurrentOrgId = authUser.CurrentOrg;
                user.Roles = authUser.Roles;
                user.Trainees = authUser.Trainees;
                user.CurrentTraineeId = authUser.CurrentTrainee;
            }

            return user;
        }
