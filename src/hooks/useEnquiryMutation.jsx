import { useMutation } from '@tanstack/react-query';

import { postEnquiry } from '../services/api';

export function useEnquiryMutation() {
  return useMutation({ mutationFn: postEnquiry, retry: 0 });
}
