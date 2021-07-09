const { Message } = require('discord.js');
const obj = {
    message: new Message(),
    noPermissionMessage: new String(),
    prefix: new String(),
    noMentionMessage: new String(),
    reasonRequired: new Boolean(),
    noReasonSpecified: new String(),
    permissionRequired: new Boolean(),
    notBannableMessage: new String(),
    successMessage: new String()
}
/**
 * 
 * @param {obj} param0 options!
 * @function true
 * @description Ban command made easy!
 * @returns Message
 * @example
 * const Discord = require('discord.js');
 * const client = new Discord.Client();
 * 
 * client.on('ready', () => console.log('ready'));
 * const { commands } = require('ezdjs');
 * client.on('message', (message) => {
 *  if(message.content.startsWith("?ban")) {
 *      const successMessage = "Banned {member} for {reason}";
 *      const notBannableMessage = "Cannot ban this member!"
 *      const permissionRequired = true;
 *      const prefix = "?";
 *      const noPermissionMessage = "You need the \`{permissions}\` permission(s) to use this command.";
 *      const noMentionMessage = "You need to actually mention someone to ban!";
 *      const reasonRequired = false;
 *      const noReasonSpecified = "You need to specify a reason!"; // this is optional and only ran when reasonRequired is true
 * 
 *      commands.ban({
 *          message, // the message object
 *          successMessage, // bot message when its successfull
 *          permissionRequired, // if the author needs permissions to use this command
 *          prefix, // to get arguments, default is !
 *          nopermissionMessage, // if the user doesnt have perms to use this command.
 *          noMentionMessage, // if the author didn't mention anyone
 *          reasonRequired, // if the reason is required or not
 *          noReasonSpecified // if the reason is required and the author didn't give a reason
 *      })
 *      // thats it!
 *  }
 * })
 * 
 * client.login('token');
 */
module.exports = ({ successMessage = "Successfully ban {member} for {reason}", notBannableMessage = "Cannot ban this member!", permissionRequired = true, prefix = "!", message, noPermissionMessage="You need the \`{permissions}\` permissions to do this command!", noMentionMessage="You need to mention somebody for this to work!", reasonRequired=false, noReasonSpecified = "No reason specified" }) => {
    if(!message) return console.error("[ezdjs:ban] No message given.");
    if(!(message instanceof Message)) return console.error("[ezdjs:ban] Message is either deleted or does not exist");
    if(!prefix) return console.error("[ezdjs:ban] Prefix was not given. Using !");
    if(message.author.bot || !message.guild) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    noPermissionMessage = noPermissionMessage.replace("{permissions}", "BAN_MEMBERS");
    noPermissionMessage = noPermissionMessage.replace("{permissions:simple}", "ban");
    if(permissionRequired && !message.member.permissions.has("BAN_MEMBERS")) return message.channel.send(noPermissionMessage).then(msg => msg);
    if(!message.mentions.members.first()) {
        return message.channel.send(noMentionMessage).then(msg => msg);
    };
    let reason = reasonRequired ?
    (args.slice(1).join(" ") || noReasonSpecified) :
    null
    ;
    if(reasonRequired && !reason) return message.channel.send(noReasonSpecified);
    if(!message.mentions.members.first().bannable) return message.reply(notBannableMessage).then(msg => msg);
    message.mentions.members.first().ban();
    successMessage = successMessage.replace("{member}", message.mentions.users.first().tag);
    successMessage = successMessage.replace("{reason}", reason);
    return message.channel.send(successMessage).then((msg) => msg);
};