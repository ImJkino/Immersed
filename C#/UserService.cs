 private static List<int> GetTrainees(List<Trainee> traineeList)
        {
            List<int> traineeId = new List<int>();

            if (traineeList != null && traineeList.Count > 0)
            {
                foreach (Trainee trainee in traineeList)
                {
                    traineeId.Add(trainee.Id);
                }
                return traineeId;
            }
            else
            {
                traineeId.Add(0);
                return traineeId;
            }

        }
        
        
        public async Task<bool> ChangeCurrentTrainee(IUserAuthData currentUser, int traineeId)
        {
            string procName = "[dbo].[Trainees_GetTraineesByUserId]";
            UserBase user = null;
            List<int> trainees = null;
            bool isSuccessful = false;

            _dataProvider.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@UserId", currentUser.Id);
                col.AddWithValue("@TraineeId", traineeId);
            },
            singleRecordMapper: delegate (IDataReader reader, short set)
            {
                switch (set)
                {
                    case 0:
                        int index = 0;
                        int checkedTraineeId = reader.GetSafeInt32(index++);
                        break;

                    case 1:
                        int startingIndex = 0;
                        int trainee = reader.GetSafeInt32(startingIndex++);
                        if (trainees == null)
                        {
                            trainees = new List<int>();
                        }
                        trainees.Add(trainee);
                        break;
                }

            });
            if (user == null)
            {
                user = new UserBase();
                user.Id = currentUser.Id;
                user.Name = currentUser.Name;
                user.TenantId = currentUser.TenantId;
                user.Trainees = trainees;
                user.CurrentTraineeId = traineeId;
                user.Organizations = currentUser.Organizations;
                user.CurrentOrgId = currentUser.CurrentOrgId;
                user.Roles = currentUser.Roles;
            }
            if (user != null)
            {
                await _authenticationService.LogInAsync(user);
                isSuccessful = true;
            }
            return isSuccessful;

        }
