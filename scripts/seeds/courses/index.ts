import { CourseSeed } from "../types"

import { awsCloudPractitionerCourse } from "./aws-cloud-practitioner"
import { awsSolutionsArchitectCourse } from "./aws-solutions-architect"
import { awsDeveloperAssociateCourse } from "./aws-developer-associate"
import { awsSysOpsAdministratorCourse } from "./aws-sysops-administrator"
import { googleCloudDigitalLeaderCourse } from "./google-cloud-digital-leader"
import { googleCloudAssociateCloudEngineerCourse } from "./google-cloud-associate-cloud-engineer"
import { googleCloudProfessionalArchitectCourse } from "./google-cloud-professional-architect"
import { azureFundamentalsCourse } from "./azure-fundamentals"
import { azureAdministratorAssociateCourse } from "./azure-administrator-associate"
import { azureSolutionsArchitectCourse } from "./azure-solutions-architect"

export const courseSeeds: CourseSeed[] = [
  awsCloudPractitionerCourse,
  awsSolutionsArchitectCourse,
  awsDeveloperAssociateCourse,
  awsSysOpsAdministratorCourse,
  googleCloudDigitalLeaderCourse,
  googleCloudAssociateCloudEngineerCourse,
  googleCloudProfessionalArchitectCourse,
  azureFundamentalsCourse,
  azureAdministratorAssociateCourse,
  azureSolutionsArchitectCourse,
]
