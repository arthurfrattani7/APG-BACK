export interface IToUserEntity {
  id: number;
  name: string;
  email: string;
  password: string;
  type: users_type | null;
  data_criacao: Date | null; 
  isVerified: boolean;
  verificationCodeHash?: string | null;
  verificationExpiredAt?: Date | null;
}
export interface ICourseBenefitFromDb {
  id: string;
  text: string;
  courseId: string;
}

export interface ICourseFromDb {
  id: string;
  title: string;
  bgClass: string;
  description: string;
  duration: string;
  modules: number;
  level: string;
  benefits: ICourseBenefitFromDb[];
  hotmartLink: string;
}

// Mantemos esta caso precises dela em DTOs ou validações externas
export interface IToCourseEntity {
  id: string;
  title: string;
  bgClass: string;
  description: string;
  duration: string;
  modules: number;
  level: string;
  benefits: string[];
  hotmartLink: string;
}