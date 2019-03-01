import { Test } from '@nestjs/testing';

import { ConfigService } from '../config';

describe('ConfigService', () => {
  
  let configService: ConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
        
        providers: [ConfigService],
      }).compile();

      configService = module.get<ConfigService>(ConfigService);
    
  });

  describe('getLoggerOptions', () => {
    it('should return an array of cats', async () => {

      // jest.spyOn(configService, 'getLoggerOptions').mockImplementation(() => result);
        console.log(configService.getLoggerOptions())
      expect(configService.getLoggerOptions()).toBe({});
    });
  });