import Api from '@/utils/api';

/**
 * 获取问卷详情
 * @param id 问卷id
 * @returns
 */
export const getQuestionService = async (id: string) => {
    return Api.getResult(`/questions/${id}`);
};

/**
 * 创建问卷
 * @returns
 */
export const createQuestionService = async () => {
    return Api.postResult('/questions');
};
