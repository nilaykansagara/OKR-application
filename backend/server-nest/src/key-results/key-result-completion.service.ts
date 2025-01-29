import {Injectable} from "@nestjs/common";
import {KeyResultDto} from "./key-result.dto";

@Injectable()
export class KeyResultCompletionService {
    isComplete(keyResultDto: KeyResultDto) {
        return keyResultDto.current_value === keyResultDto.target_value;
    }

}