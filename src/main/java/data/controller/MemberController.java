package data.controller;

import data.dto.MemberDto;
import data.service.MemberSerive;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/member")
@AllArgsConstructor
public class MemberController {
    MemberSerive memberSerive;

    @PostMapping("/insert")
    public void insert(@RequestBody MemberDto dto){
        memberSerive.insertMember(dto);
    }

    @GetMapping("/list")
    public List<MemberDto> list(){
        return memberSerive.getAllMembers();
    }

    @DeleteMapping("/delete")
    public void delete(int num){
        memberSerive.deleteMember(num);
    }

    @GetMapping("/getname")
    public String getName(String myid){
        return memberSerive.getName(myid);
    }
    @GetMapping("/searchid")
    public int searchId(String myid){
        return memberSerive.getSearchId(myid);
    }

    @GetMapping("/login")
    public int login(String myid, String mypass){
        return memberSerive.getLogin(myid, mypass);
    }

}
